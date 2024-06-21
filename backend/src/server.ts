import express from "express"
import cors from "cors"
import searchRoutes from "./routes/searchRouter"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", searchRoutes)

const PORT = 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
