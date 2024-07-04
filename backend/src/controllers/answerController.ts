import Anthropic from "@anthropic-ai/sdk"
import { kv } from "@vercel/kv"
import { type Request, type Response } from "express"

const MODEL = "claude-3-5-sonnet-20240620"
const MAX_TOKENS = 1024
const STREAM_DELIM = "%$%"
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const generateAnswerStream = async (req: Request, res: Response) => {
  const log = true
  const { query, secret, retry } = req.body

  const validCodes = process.env.SECRET_CODES_ANSWER?.split(",") || []

  if (!validCodes.includes(secret)) {
    return res.status(401).json({ message: "Invalid code" })
  }

  if (!query) {
    return res.status(400).json({ error: "Missing query" })
  }
  // TODO: add in case where the bot requests realtime data before responding

  let isResponseEnded = false

  // TODO: move off vercel or find solution
  // response streaming does not work with vercel, it only works locally
  // vercel can still send back the response all at once, with these helper functions preventing breakage
  // Issue: https://github.com/vercel/next.js/discussions/47076

  // this was supposed to resolve vercel streaming bug but did not
  // "X-Content-Type-Options": "nosniff",

  const endResponse = () => {
    if (!isResponseEnded) {
      isResponseEnded = true
      res.end()
    }
  }
  const safeWrite = (data: string) => {
    if (!isResponseEnded) {
      res.write(data)
    }
  }

  try {
    const cachedKey = `stream-answer:${query}`
    if (!retry) {
      const cachedResponse = await kv.get(cachedKey)
      if (cachedResponse) {
        if (log) console.log(`[INFO] Using cached response for query: ${query}`)
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        })
        safeWrite(`data: ${cachedResponse}${STREAM_DELIM}`)
        safeWrite(`data: [DONE]${STREAM_DELIM}`)
        return res.end()
      }
    }
    // const testingOnlyStr =
    //   "This is a test run. Use exactly 2 claims. Be extremely concise. Only use five sentences at most."
    const testingOnlyStr = ""

    const prompt = `Concisely infer what the user most likely wants to learn, given their query.
Write this in a thinking space block like so:
<thinking> {content} </thinking>

Then, answer the user's query concisely in prose.
Annotate the core claims you make that need to be verified in this format:
<claim> {content} </claim>

I'll use regex to parse your responses and verify your claims, so your formatting must be exact.
You should make 0 to 3 of these claims total. Use them wisely. If it's a simple, clear fact, then don't make it a claim.
Each verified claim should be essential to answering the question and as concrete as possible.

${testingOnlyStr}

query:
${query}`
    let fullResponse = ""
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    })

    if (log) console.log(`[INFO] Start stream response for query: ${query}`)

    const stream = client.messages.stream({
      messages: [{ role: "user", content: prompt }],
      model: MODEL,
      max_tokens: MAX_TOKENS,
    })

    stream.on("text", (text: string) => {
      fullResponse += text
      safeWrite(`data: ${text}${STREAM_DELIM}`)
    })

    stream.on("end", () => {
      kv.set(cachedKey, fullResponse)
      safeWrite(`data: [DONE]${STREAM_DELIM}`)
      endResponse()
    })

    stream.on("error", (error: Error) => {
      console.error("Stream error:", error)
      safeWrite(
        `data: ${JSON.stringify({ error: error.message })}${STREAM_DELIM}`
      )
      endResponse()
    })
  } catch (error) {
    console.error("Error:", error)
    safeWrite(
      `data: ${JSON.stringify({
        error: "An error occurred while processing the request",
      })}${STREAM_DELIM}`
    )
    endResponse()
  }
}
