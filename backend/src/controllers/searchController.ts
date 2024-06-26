import { type Request, type Response } from "express"
import { generateRankedSourceMetadatas } from "../services/searchService"
import { generateOverview } from "../services/overviewService"
import { generateSourceMetadatasWithSummary } from "../services/summaryService"
import { kv } from "@vercel/kv"
import crypto from "crypto"

const ONE_DAY_IN_SECONDS = 24 * 60 * 60
const MAX_SECRET_CODE_USES = 100

function hashKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex")
}
export const generateSourceMetadatasEndpoint = async (
  req: Request,
  res: Response
) => {
  const log = true
  const { query, secret } = req.body
  const validCodes = process.env.SECRET_CODES?.split(",") || []

  if (!validCodes.includes(secret)) {
    return res.status(401).json({ message: "Invalid code" })
  }

  const isSecretCodeValid = await checkSecretCodeValidity(secret)
  if (!isSecretCodeValid) {
    return res.status(429).json({ message: "Secret code usage limit exceeded" })
  }

  // it is essential that users can navigate between results page and external links quickly
  // ideally, i would use bfcache instead but nextjs/vercel prevent that by setting the control headers and allowing me to change them
  // Cons of kv-store approach: requires lot of memory at scale, only persists data for 1-day so "stale" navigations are still slow
  // Proper solution: don't use nextjs (https://stackoverflow.com/questions/76228269/setting-cache-control-header-in-nextjs-app-router)
  const cacheStartTime = Date.now()
  const cacheKey = `search:${query}`
  const cachedResult = await kv.get(cacheKey)

  if (cachedResult) {
    return res.json(cachedResult)
  }

  // Increment the secret code usage for new (uncached) requests
  await incrementSecretCodeUsage(secret)

  const cacheEndTime = Date.now()
  if (log) {
    const totalCacheTimeInS = (cacheEndTime - cacheStartTime) / 1000
    console.log(`Total cache time: ${totalCacheTimeInS}`)
  }
  try {
    const startTime = Date.now()
    const sourceMetadatas = await generateRankedSourceMetadatas(query)
    const [sourceMetadatasWithSummaries, { snippets, themes }] =
      await Promise.all([
        generateSourceMetadatasWithSummary(sourceMetadatas),
        generateOverview(query, sourceMetadatas),
      ])
    const endTime = Date.now()
    if (log) {
      const totalTimeInS = (endTime - startTime) / 1000
      console.log(`Total source metadata generation: ${totalTimeInS}s.`)
    }

    const sourcesMetadatasNoText = sourceMetadatasWithSummaries.map(
      ({ textContent, ...rest }) => rest
    )
    const result = {
      sourceMetadatas: sourcesMetadatasNoText,
      snippets,
      themes,
    }

    await kv.set(cacheKey, result, { ex: ONE_DAY_IN_SECONDS })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function checkSecretCodeValidity(secret: string): Promise<boolean> {
  const secretKey = `secret:${secret}`
  const hashedSecretKey = hashKey(secretKey)
  const usageCount: number = (await kv.get(hashedSecretKey)) || 0
  return usageCount <= MAX_SECRET_CODE_USES
}

async function incrementSecretCodeUsage(secret: string): Promise<void> {
  const secretKey = `secret:${secret}`
  const hashedSecretKey = hashKey(secretKey)
  await kv.incr(hashedSecretKey)
}
