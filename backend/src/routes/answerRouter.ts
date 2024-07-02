import { Router } from "express"
import { generateAnswerStream } from "../controllers/answerController"

const router = Router()

router.post("/", generateAnswerStream)

export default router
