import dotenv from "dotenv"
dotenv.config()

import express, { Request, Response } from "express"
import cors from "cors"
import searchRoutes from "./routes/searchRouter"
import answerRoutes from "./routes/answerRouter"
import verifyRoutes from "./routes/verifyRouter"

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ limit: "10kb", extended: true }))

app.use("/api/search", searchRoutes)
app.use("/api/stream-answer", answerRoutes)
app.use("/api/verify", verifyRoutes)

app.get("/", (_req: Request, res: Response) => {
  const message = "Surface home test!"
  return res.send(message)
})

app.listen(PORT, () => {
    console.log(`[INFO] Server is running on port ${PORT}`)
})
