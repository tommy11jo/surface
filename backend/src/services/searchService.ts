import axios from "axios"
import { search, SafeSearchType } from "duck-duck-scrape"
import { generateLLMResponse } from "./llmService"

const NUM_SOURCES_TO_PROCESS = 3
const NUM_SOURCES_TO_SHOW = 30

export type SourceMetadata = {
  url: string
  title: string
  icon: string
  hostname: string
  textContent: string | undefined
  summary?: string
}

export const generateSourceMetadatasService = async (query: string) => {
  if (query.length >= 200) throw new Error("Query must be <200 chars.")
  const sourceMetadatas = await searchByDDGS(query)
  const textContents: (string | undefined)[] = await Promise.all(
    sourceMetadatas.map((result, i) =>
      i < NUM_SOURCES_TO_PROCESS ? getTextContent(result.url, true) : undefined
    )
  )
  textContents.forEach(
    (textContent, i) => (sourceMetadatas[i].textContent = textContent)
  )
  const sourceMetadatasWithText = sourceMetadatas.filter(
    (metadata) => metadata.textContent
  )

  const overviewPrompts = sourceMetadatasWithText.map((metadata) =>
    getWebpageSummaryPrompt(metadata.textContent!, metadata.hostname)
  )

  const llmStartTime = Date.now()
  const llmSummaryResponses = await Promise.all(
    overviewPrompts.map((prompt) => generateLLMResponse(prompt))
  )
  const llmEndTime = Date.now()
  const totalTime = llmEndTime - llmStartTime
  console.log(`Total LLM response time: ${totalTime / 1000}s`)

  const sourceSummaries = llmSummaryResponses
    .map((response) =>
      response !== null ? extractSummaryFromResponse(response) : null
    )
    .filter((summary) => summary !== null) as string[]

  // do not assume a valid summary
  // sources like youtube videos might not have summaries or the LLM might not generate the summary correctly
  const sourceMetadatasWithOverview: SourceMetadata[] = []
  sourceSummaries.forEach((overview, index) => {
    if (overview !== null) {
      sourceMetadatasWithText[index].summary = overview
      sourceMetadatasWithOverview.push({
        ...sourceMetadatasWithText[index],
        summary: overview,
      })
    }
  })

  const sourceMetadatasWithoutOverviews = sourceMetadatas.filter(
    (metadata) => !metadata.summary
  )
  const updatedMetadatas = [
    ...sourceMetadatasWithOverview,
    ...sourceMetadatasWithoutOverviews,
  ].map(({ textContent, ...rest }) => rest)

  return updatedMetadatas
}

const INIT_SUMMARY_MARKER = "### Initial Summary"
const FINAL_SUMMARY_MARKER = "### Final Summary"
export const getWebpageSummaryPrompt = (
  sourceText: string,
  hostname: string
) => {
  const approxWordsCutoff = 1000
  const sentenceRange =
    sourceText.length > 6 * approxWordsCutoff ? "4-6" : "2-4"
  const prompt = `Your job is to summarize the text of a webpage on ${hostname}.
If the text is empty or garbled or blocked by network security, just output "None".
Otherwise, write your response in this format, applying these descriptions:
## Summary Attempts
${INIT_SUMMARY_MARKER}
{write a precis of the text in ${sentenceRange} sentences.}

${FINAL_SUMMARY_MARKER}
{rewrite the summary to make it more concise, simple, and entity dense. Make every word count.}


Webpage Text:
${sourceText}
  `
  console.log("prompt is ", prompt)
  return prompt
}

export const extractSummaryFromResponse = (response: string): string => {
  const finalSummaryStart = response.lastIndexOf(FINAL_SUMMARY_MARKER)
  if (finalSummaryStart === -1) {
    throw new Error("Final summary not found in the response")
  }

  const summaryStart = finalSummaryStart + FINAL_SUMMARY_MARKER.length
  return response.slice(summaryStart).trim()
}

export const searchByDDGS = async (query: string, log: boolean = true) => {
  const searchResults = await search(query, {
    safeSearch: SafeSearchType.STRICT,
  })

  const sourceMetadatas: SourceMetadata[] = searchResults.results.map(
    (result, i) => ({
      url: result.url,
      title: result.title,
      icon: result.icon,
      hostname: result.hostname,
      textContent: undefined,
    })
  )
  return sourceMetadatas.slice(0, NUM_SOURCES_TO_SHOW)
}

export const getTextContent = async (
  url: string,
  trim: boolean
): Promise<string | undefined> => {
  console.log("url is", url)
  try {
    const approxWordsCutoff = 3000
    const response = await axios.get(`https://r.jina.ai/${url}`, {
      responseType: "text",
    })

    let data = response.data
    // Remove markdown links, keeping the visible text
    data = data.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    data = data.replace(/!\[.*?\]\(.*?\)/g, "")

    if (trim && data.length > approxWordsCutoff * 6) {
      const firstPart = data.slice(0, 9000)
      const lastPart = data.slice(-9000)
      return firstPart + "\n\n[CONTENT REMOVED]\n\n" + lastPart
    }

    return data
  } catch (error) {
    console.error(
      `Failed to fetch text content for ${url}\nError:`,
      (error as Error).message
    )
    return undefined
  }
}
