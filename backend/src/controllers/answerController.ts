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
const TEMPERATURE = 0.6
const NUM_CLAIMS = 3
const SYS_PROMPT = `You are an assistant that directly answers the user's query.
Use simple language and high information-density.
First, plan your response in 1-2 short sentences using thinking syntax like so:
<thinking> {1-2 sentences} </thinking>

Then, as you respond, demarcate important points or details using claims.
Make 0 to ${NUM_CLAIMS} claims in total.
A claim is a simple sentence expressing a single, atomic idea.
A claim should be a clear, falsifiable statement.

A claim can be made based on the following example format:
<claim>This is an example claim. <requestCitation googleSearchQuery="example query" /></claim>
`

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

    let fullResponse = ""
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    })

    await incrementSecretCodeUsage(secret)
    if (log) console.log(`[INFO] Start stream response for query: ${query}`)
    const stream = client.messages.stream({
      messages: [{ role: "user", content: query }],
      model: MODEL,
      system: SYS_PROMPT,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
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
