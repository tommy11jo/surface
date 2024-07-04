import axios from "axios"
import OpenAI from "openai"
export const generateFireworkResponse = async (
  prompt: string,
  model: string = "accounts/fireworks/models/llama-v3-70b-instruct",
  log: boolean = false
) => {
  const url = "https://api.fireworks.ai/inference/v1/chat/completions"
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${process.env["FIREWORK_API_KEY"]}`,
  }
  const payload = {
    model: model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  }

  try {
    const response = await axios.post(url, payload, { headers: headers })
    const textContent = response.data.choices[0].message.content

    if (log) {
      console.log("llm response:", textContent)
    }

    return textContent
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error(
        "Error calling Firework API:",
        error.response.data.error.message
      )
    } else {
      console.error("Error calling Firework API:", error.message)
    }
    return null
  }
}

export const generatePerplexityResponse = async (
  prompt: string,
  model: string = "llama-3-70b-instruct",
  log: boolean = false
) => {
  const url = "https://api.perplexity.ai/chat/completions"
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${process.env["PERPLEXITY_API_KEY"]}`,
  }
  const payload = {
    model: model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  }

  try {
    const response = await axios.post(url, payload, { headers: headers })
    const textContent = response.data.choices[0].message.content

    if (log) {
      console.log("llm response:", textContent)
    }

    return textContent
  } catch (error) {
    console.error("Error calling Perplexity API:", error)
    return null
  }
}

export const generateOpenAIResponse = async (
  prompt: string,
  model: string = "gpt-4o",
  log: boolean = false
) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    })

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
    })

    const textContent = chatCompletion.choices[0].message.content

    if (log) {
      console.log("llm response", textContent)
    }

    return textContent ?? ""
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    throw error
  }
}

export const getClaudeResponse = async (
  prompt: string,
  maxTokens: number = 1000,
  log: boolean = false
): Promise<string> => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const apiUrl = "https://api.anthropic.com/v1/messages"

  const request = {
    model: "claude-3-5-sonnet-20240620",
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  }

  try {
    const response = await axios.post(apiUrl, request, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
    })
    const textContent = response.data.content[0].text
    if (log) console.log("llm response", textContent)
    return textContent
  } catch (error) {
    console.error("Error calling Claude API:", error)
    throw error
  }
}
export const generateLLMResponse = generateFireworkResponse
