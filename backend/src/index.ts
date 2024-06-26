import express, { Request, Response } from "express"
import cors from "cors"
import searchRoutes from "./routes/searchRouter"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ limit: "10kb", extended: true }))

app.use("/api", searchRoutes)

app.get("/", (_req: Request, res: Response) => {
  const message = process.env.VERCEL_ENV
    ? "Test: express ts on vercel!"
    : "Test: express locally!"
  return res.send(message)
})

console.log("Running in node env:", process.env.NODE_ENV)
console.log("Running in vercel:", process.env.VERCEL_ENV)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app
