import { type Request, type Response } from "express"
import {
  checkSecretCodeValidity,
  incrementSecretCodeUsage,
} from "../services/secretService"
import { ClaimMetadata } from "../services/types"
import { generateClaimEval } from "../services/claimService"
import { redisCacheClient } from "../utils/redisClient"

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
    const cachedStr = await redisCacheClient.get(cacheKey)
    if (log) {
      console.log(`[INFO] Found cached claim: ${claim}`)
    }
    if (cachedStr !== null) {
      const cachedResult = JSON.parse(cachedStr)
      return res.json(cachedResult)
    }
  }

  await incrementSecretCodeUsage(secret)
  if (log) console.log(`[INFO] Generating eval for claim: ${claim}`)
  const claimEval: ClaimMetadata | null = await generateClaimEval(
    claim,
    context
  )
  await redisCacheClient.set(cacheKey, JSON.stringify(claimEval), {
    EX: ONE_DAY_IN_SECONDS,
  })
  res.json(claimEval)
}
