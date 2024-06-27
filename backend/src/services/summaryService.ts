import { generateLLMResponse } from "./llmService"
import { SourceMetadata } from "./types"

const INIT_SUMMARY_MARKER = "### Initial Summary"
const FINAL_SUMMARY_MARKER = "### Final Summary"
const FAILURE_WORD = "GARBLED"
export const generateSourceMetadatasWithSummary = async (
  sourceMetadatas: SourceMetadata[],
  log: boolean = true
) => {
  const sourceMetadatasWithText = sourceMetadatas.filter(
    (metadata) => metadata.textContent
  )

  const summaryPrompts = sourceMetadatasWithText.map((metadata) =>
    getWebpageSummaryPrompt(metadata.textContent!, metadata.hostname)
  )

  const summaryStartTime = Date.now()
  const llmSummaryResponses = await Promise.all(
    summaryPrompts.map((prompt) => generateLLMResponse(prompt))
  )
  const summaryEndTime = Date.now()
  if (log) {
    const summaryTime = summaryEndTime - summaryStartTime
    console.log(`[INFO] Summary generation: ${summaryTime / 1000}s`)
  }

  const sourceSummaries = llmSummaryResponses
    .map((response) =>
      response !== null ? extractSummaryFromResponse(response) : null
    )
    .filter((summary) => summary !== null) as string[]

  // do not assume a valid summary
  // sources like youtube videos might not have summaries or the LLM might not generate the summary correctly
  const sourceMetadatasWithSummaries: SourceMetadata[] = []
  sourceSummaries.forEach((summary, index) => {
    if (summary !== null) {
      sourceMetadatasWithText[index].summary = summary
      sourceMetadatasWithSummaries.push({
        ...sourceMetadatasWithText[index],
        summary: summary,
      })
    }
  })

  const sourceMetadatasWithoutOverviews = sourceMetadatas.filter(
    (metadata) => !metadata.summary
  )
  const updatedMetadatas = [
    ...sourceMetadatasWithSummaries,
    ...sourceMetadatasWithoutOverviews,
  ]

  return updatedMetadatas
}

export const getWebpageSummaryPrompt = (
  sourceText: string,
  hostname: string
) => {
  const approxWordsCutoff = 1000
  const sentenceRange =
    sourceText.length > 6 * approxWordsCutoff ? "2-4" : "1-2"
  const prompt = `Your job is to summarize the main content of a webpage on ${hostname}.
If the text has a captcha, is blocked, is empty, or is malformed, just output "${FAILURE_WORD}".

Otherwise, write a summary of the text in ${sentenceRange} sentences.
Use telegraphic speech.
Use simple language.
Write plainly and concisely.
Be specific and concrete.

Then, rewrite the summary and make it more entity-dense and simple.
Remove any mention of title or hostname.
Make every word count.

Example output:
## Summary Attempts
${INIT_SUMMARY_MARKER}
<initial summary here>

${FINAL_SUMMARY_MARKER}
<final summary here>

Webpage Text:
${sourceText}
  `
  return prompt
}

export const extractSummaryFromResponse = (response: string): string => {
  if (response.includes(FAILURE_WORD)) return ""
  const finalSummaryStart = response.lastIndexOf(FINAL_SUMMARY_MARKER)
  if (finalSummaryStart === -1) {
    throw new Error("Final summary not found in the response")
  }

  const summaryStart = finalSummaryStart + FINAL_SUMMARY_MARKER.length
  return response.slice(summaryStart).trim()
}
