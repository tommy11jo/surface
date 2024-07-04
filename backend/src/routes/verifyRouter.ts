import { Router } from "express"
import { generateProofForClaim } from "../controllers/verifyController"

const router = Router()

router.post("/", generateProofForClaim)

export default router
