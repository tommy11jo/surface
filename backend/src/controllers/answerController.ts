import Anthropic from "@anthropic-ai/sdk"
import { type Request, type Response } from "express"
import {
  checkSecretCodeValidity,
  incrementSecretCodeUsage,
} from "../services/secretService"

import { redisCacheClient } from "../utils/redisClient"
const MODEL = "claude-3-5-sonnet-20240620"
const MAX_TOKENS = 1024
const STREAM_DELIM = "%$%"
const ONE_DAY_IN_SECONDS = 60 * 60 * 24

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const generateAnswerStream = async (req: Request, res: Response) => {
  const log = true
  const { query, secret, retry } = req.body

  const validCodes =
    process.env.SECRET_CODES_ANSWER?.split(",").map((code) => code.trim()) || []

  if (!validCodes.includes(secret)) {
    return res.status(401).json({ message: "Invalid code" })
  }

  if (!query) {
    return res.status(400).json({ error: "Missing query" })
  }

  const isSecretCodeValid = await checkSecretCodeValidity(secret)
  if (!isSecretCodeValid) {
    return res.status(429).json({ message: "Secret code usage limit exceeded" })
  }
  // TODO: add in case where the bot requests realtime data before responding

  try {
    const cacheKey = `stream-answer:${query}`
    if (!retry) {
      let cachedResponseStr = await redisCacheClient.get(cacheKey)
      if (cachedResponseStr !== null) {
        const cachedReponse = JSON.parse(cachedResponseStr)
        if (log) console.log(`[INFO] Using cached response for query: ${query}`)
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        })
        res.write(`data: ${cachedReponse}${STREAM_DELIM}`)
        res.write(`data: [DONE]${STREAM_DELIM}`)
        return res.end()
      }
    }

    const prompt = `Your job is to concisely answer the user's query. You are wise and rational and have broad expertise.

First, concisely infer what the user most likely wants to learn, given their query.
Write this in a thinking space block like so:
<thinking> {content} </thinking>

Then, answer the user's query concisely in prose.
As you respond, you may test 0 to 3 claims total, to verify the truth of essential facts and ideas.
A claim can be made based on the following example format:
<claim>This is an example claim <requestCitation googleSearchQuery="example query" /></claim>

Each claim must be simple sentence.
Each claim must be atomic. It should contain one simple fact or idea which can be searched easily.
Each claim must be essential. It should be a crux or a core detail.

query:
${query}
`
    let fullResponse = ""
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    })

    await incrementSecretCodeUsage(secret)
    if (log) console.log(`[INFO] Start stream response for query: ${query}`)
    const stream = client.messages.stream({
      messages: [{ role: "user", content: prompt }],
      model: MODEL,
      max_tokens: MAX_TOKENS,
    })

    stream.on("text", (text: string) => {
      fullResponse += text
      res.write(`data: ${text}${STREAM_DELIM}`)
    })

    stream.on("end", async () => {
      await redisCacheClient.set(cacheKey, JSON.stringify(fullResponse), {
        EX: ONE_DAY_IN_SECONDS,
      })
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
