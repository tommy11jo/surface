import { Router } from "express"
import { generateSourceMetadatasEndpoint } from "../controllers/searchController"

const router = Router()

router.post("/search", generateSourceMetadatasEndpoint)

export default router
