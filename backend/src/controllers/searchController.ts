import { type Request, type Response } from "express"
import { generateSourceMetadatasService } from "../services/searchService"

export const generateSourceMetadatas = async (req: Request, res: Response) => {
  const { query } = req.body

  try {
    const updatedMetadatas = await generateSourceMetadatasService(query)
    res.json(updatedMetadatas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
