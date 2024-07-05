import { type Request, type Response } from "express"
import {
  checkSecretCodeValidity,
  incrementSecretCodeUsage,
} from "../services/secretService"
import { ClaimMetadata } from "../services/types"
import { generateClaimEval } from "../services/claimService"
import { kv } from "@vercel/kv"

const ONE_DAY_IN_SECONDS = 24 * 60 * 60

export const generateProofForClaim = async (req: Request, res: Response) => {
  const log = true
  const { claim, context, secret, retry } = req.body
  const validCodes =
    process.env.SECRET_CODES_ANSWER?.split(",").map((code) => code.trim()) || []

  if (secret === "") return res.status(401).json({ message: "Empty code" })
  if (!validCodes.includes(secret)) {
    return res.status(401).json({ message: "Invalid code" })
  }
  if (claim.length > 1000)
    return res
      .status(400)
      .json({ message: "Claim exceeds maximum length of 1000 characters" })

  const isSecretCodeValid = await checkSecretCodeValidity(secret)
  if (!isSecretCodeValid) {
    return res.status(429).json({ message: "Secret code usage limit exceeded" })
  }
  const cacheKey = `verify:${claim}`
  if (!retry) {
    const cachedResult = await kv.get(cacheKey)
    if (log) {
      console.log(`[INFO] Found cached claim: ${claim}`)
    }
    if (cachedResult) {
      return res.json(cachedResult)
    }
  }

  await incrementSecretCodeUsage(secret)
  if (log) console.log(`[INFO] Generating eval for claim: ${claim}`)
  const claimEval: ClaimMetadata | null = await generateClaimEval(
    claim,
    context
  )
  await kv.set(cacheKey, claimEval, { ex: ONE_DAY_IN_SECONDS })
  res.json(claimEval)
}
