import { SourceMetadata } from "./types"
import { search as ddgs, SafeSearchType } from "duck-duck-scrape"

const INIT_SUMMARY_MARKER = "### Initial Summary"
const FINAL_SUMMARY_MARKER = "### Final Summary"
const FAILURE_WORD = "GARBLED"
export const getWebpageSummaryPrompt = (
  sourceText: string,
  hostname: string,
  log: boolean = false
) => {
  const approxWordsCutoff = 1000
  const sentenceRange =
    sourceText.length > 6 * approxWordsCutoff ? "2-6" : "2-4"
  const prompt = `Your job is to summarize the main content of a webpage on ${hostname}.
Ignore the navigation content.

If the text has a captcha, is blocked, is empty, or is malformed, just output "${FAILURE_WORD}".
Otherwise, write a summary of the text in ${sentenceRange} sentences.
The summary should be concise, entity-dense, and informational.

Then, rewrite the summary and improve it if you can.
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
  if (log) console.log("prompt is ", prompt)
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

export const searchByDDGS = async (
  query: string,
  count: number = 20,
  log: boolean = true
) => {
  const searchResults = await ddgs(query, {
    safeSearch: SafeSearchType.STRICT,
  })

  const sourceMetadatas: SourceMetadata[] = searchResults.results.map(
    (result) => ({
      url: result.url,
      title: result.title,
      icon: result.icon,
      hostname: result.hostname,
      textContent: undefined,
    })
  )
  return sourceMetadatas.slice(0, count)
}
