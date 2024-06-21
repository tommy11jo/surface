import { Router } from "express"
import { generateSourceMetadatas } from "../controllers/searchController"

const router = Router()

router.post("/search", generateSourceMetadatas)

export default router
