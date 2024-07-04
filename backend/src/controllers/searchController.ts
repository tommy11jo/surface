import { type Request, type Response } from "express"
import { generateRankedSourceMetadatas } from "../services/searchService"
import { generateOverview } from "../services/overviewService"
import { generateSourceMetadatasWithSummary } from "../services/summaryService"
import { kv } from "@vercel/kv"
import {
  checkSecretCodeValidity,
  incrementSecretCodeUsage,
} from "../services/secretService"

const ONE_DAY_IN_SECONDS = 24 * 60 * 60

export const generateSourceMetadatasEndpoint = async (
  req: Request,
  res: Response
) => {
  const log = true
  const { query, secret, hardRefresh } = req.body
  const validCodes = process.env.SECRET_CODES_SEARCH?.split(",") || []

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
  const cacheKey = `search:${query}`
  if (!hardRefresh) {
    const cacheStartTime = Date.now()
    const cachedResult = await kv.get(cacheKey)

    if (cachedResult) {
      return res.json(cachedResult)
    }
    const cacheEndTime = Date.now()
    if (log) {
      const totalCacheTimeInS = (cacheEndTime - cacheStartTime) / 1000
      console.log(`[INFO] Cache time: ${totalCacheTimeInS}`)
    }
  }

  await incrementSecretCodeUsage(secret)

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
      console.log(`[INFO] Total source metadata generation: ${totalTimeInS}s.`)
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
