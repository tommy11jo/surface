import { type Request, type Response } from "express"
import { generateRankedSourceMetadatas } from "../services/searchService"
import { generateOverview } from "../services/overviewService"
import { generateSourceMetadatasWithSummary } from "../services/summaryService"

export const generateSourceMetadatasEndpoint = async (
  req: Request,
  res: Response,
  log: boolean = true
) => {
  const { query } = req.body

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
    res.json({ sourceMetadatas: sourcesMetadatasNoText, snippets, themes })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
