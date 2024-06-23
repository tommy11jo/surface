import { type Request, type Response } from "express"
import { generateSourceMetadatas } from "../services/searchService"
import { Snippet } from "../services/types"
import { generateSnippets } from "../services/overviewService"

export const generateSourceMetadatasEndpoint = async (
  req: Request,
  res: Response
) => {
  const { query } = req.body

  try {
    const sourceMetadatas = await generateSourceMetadatas(query)
    const snippets: Snippet[] = await generateSnippets(query, sourceMetadatas)
    const sourcesMetadatasNoText = sourceMetadatas.map(
      ({ textContent, ...rest }) => rest
    )
    res.json({ sourceMetadatas: sourcesMetadatasNoText, snippets })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
