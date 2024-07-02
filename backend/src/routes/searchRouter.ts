import { Router } from "express"
import { generateSourceMetadatasEndpoint } from "../controllers/searchController"

const router = Router()

router.post("/", generateSourceMetadatasEndpoint)

export default router
