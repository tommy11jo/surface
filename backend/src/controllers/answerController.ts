import Anthropic from "@anthropic-ai/sdk"
import { type Request, type Response } from "express"

const MODEL = "claude-3-5-sonnet-20240620"
const MAX_TOKENS = 1024
const STREAM_DELIM = "%$%"
const client = new Anthropic()

export const generateAnswerStream = async (req: Request, res: Response) => {
  const { query, secret } = req.body

  const validCodes = process.env.SECRET_CODES_ANSWER?.split(",") || []

  if (!validCodes.includes(secret)) {
    return res.status(401).json({ message: "Invalid code" })
  }
  console.log("TODO: count secret uses")

  if (!query) {
    return res.status(400).json({ error: "Missing query" })
  }
  // TODO: add in case where the bot requests realtime data before responding
  const testingOnlyStr =
    "This is a test run. Use exactly 1 claim. Be extremely concise. Only use five sentences at most."

  const prompt = `Dissect the user's query and infer what they most likely want to learn.
Write this in a thinking space block like so:
<thinking> {content} </thinking>

Then, answer the user's query concisely in prose.
Annotate the core claims you make that need to be verified in this format:
<claim> {content} </claim>

I'll use regex to parse your responses and verify your claims, so your formatting must be exact.
You may make 1-3 of these claims total. Use them wisely.
Each verified claim should be essential to answering the question and as concrete as possible.

${testingOnlyStr}

query:
${query}`

  try {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    })

    const stream = client.messages.stream({
      messages: [{ role: "user", content: prompt }],
      model: MODEL,
      max_tokens: MAX_TOKENS,
    })

    stream.on("text", (text: string) => {
      res.write(`data: ${text}${STREAM_DELIM}`)
    })

    stream.on("end", () => {
      res.write(`data: [DONE]${STREAM_DELIM}`)
      res.end()
    })

    stream.on("error", (error: Error) => {
      console.error("Stream error:", error)
      res.write(
        `data: ${JSON.stringify({ error: error.message })}${STREAM_DELIM}`
      )
      res.end()
    })
  } catch (error) {
    console.error("Error:", error)
    res.write(
      `data: ${JSON.stringify({
        error: "An error occurred while processing the request",
      })}${STREAM_DELIM}`
    )
    res.end()
  }
}
