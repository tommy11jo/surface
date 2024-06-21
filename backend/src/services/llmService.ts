import axios from "axios"
const generateFireworkResponse = async (
  query: string,
  model: string = "accounts/fireworks/models/llama-v3-70b-instruct",
  log: boolean = true
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
        content: query,
      },
    ],
  }

  const textContent = await axios
    .post(url, payload, { headers: headers })
    .then((response) => {
      return response.data.choices[0].message.content
    })
    .catch((error) => {
      console.error(error.message)
      return null
    })
  if (log) {
    console.log("llm response:", textContent)
  }
  return textContent
}

export const generateLLMResponse = generateFireworkResponse
