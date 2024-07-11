import { getTextContent, searchByBing } from "./searchService"
import {
  AnswerSnippet,
  ClaimMetadata,
  ClaimCategory,
  SourceMetadata,
} from "./types"
import { generateFireworkResponse, generateLLMResponse } from "./llmService"

export const generateClaimEval = async (
  toSearch: string,
  claim: string,
  numSources: number = 2,
  approxWordsCutoff: number = 2300,
  jinaTimeout: number = 7000,
  log = true
): Promise<ClaimMetadata | null> => {
  // TODO: maybe add an LLM step to generate a search
  if (log) console.log(`[INFO] Searching '${toSearch}'`)
  const sourceMetadatas: SourceMetadata[] = await searchByBing(
    toSearch,
    numSources
  )
  if (log)
    console.log(`[INFO] Fetching text for ${sourceMetadatas.length} sources.`)
  const contentFetchResults = await Promise.all(
    sourceMetadatas.map(async (metadata) => {
      const textContent = await getTextContent(
        metadata.url,
        true,
        approxWordsCutoff,
        jinaTimeout
      )
      if (log) {
        if (textContent === undefined)
          console.log(
            `[INFO] Could not retrieve text content for url: ${metadata.url}`
          )
        else
          console.log(`[INFO] Retrieved text content for url: ${metadata.url}`)
      }
      metadata.textContent = textContent
      return textContent !== undefined
    })
  )

  const hasAnyContentBeenFetched = contentFetchResults.some(
    (isContentFetched) => isContentFetched
  )

  if (!hasAnyContentBeenFetched) return null

  const sourceMetadatasStr = sourceMetadatas
    .map(
      (metadata, i) => `SOURCE ${i}:
Title: ${metadata.title}
Host: ${metadata.hostname}
Content: ${metadata.textContent}
`
    )
    .join("\n\n")

  // TODO: for now, i'm not using 'context' at all. need to test this out later.
  const prompt = `Your job is to help determine whether the provided claim is true or false. 
Be concise.

Output 0 to 2 pieces of **directly relevant** evidence from the sources.
Each piece of evidence:
- clearly supports or counters the provided claim.
- is 1-2 sentences, concise, and somewhat self-contained.
- is high-quality, informational text, since the user will be shown it directly.

Use direct quotations as much as possible.
But use paraphrasing to add clarity, when needed.

Then, based solely on the pieces of evidence, categorize the claim as:
- UNKNOWN
- SUPPORTED
- DOUBTED

Let's clarify these three categories:
- UNKNOWN - As a whole, the evidence cannot be directly applied to support or counter the claim. The evidence is not directly relevant or is unclear. When you are not sure, choose this category.
- SUPPORTED - The evidence directly shows the claim is true. Only output this if you are very confident the evidence applies to this particular context.
- DOUBTED - The evidence shows the claim is false or strongly misleading. Only output this if you are very confident the evidence applies to this particular context.

Example format:
## Claim to verify
{claim}

## Sources
{source texts}
 
## Pieces of Evidence
### Evidence 1
Content: {content}
Source: 0

### Evidence 2
Content: {content}
Source: 3

## Evaluation
{identify potential ways the evidence might not be relevant or state clearly why it is. then judge the evidence. use 2-4 very short sentences.}

## Category
{one of the three categories}

Now, let's try it out:
## Claim to verify
${claim}

## Sources
${sourceMetadatasStr}

`
  const response = await generateLLMResponse(prompt)
  if (response === null) return null
  const { snippets, category } = extractClaimData(response, sourceMetadatas)

  return {
    snippets,
    category,
    content: claim,
  }
}

const extractClaimData = (
  response: string,
  sourceMetadatas: SourceMetadata[]
): { snippets: AnswerSnippet[]; category: ClaimCategory } => {
  const snippets: AnswerSnippet[] = []
  let category: ClaimCategory = ClaimCategory.EvalUncertain

  const sections = response.split(/^##\s/m).filter((section) => section.trim())

  const snippetsSection = sections.find((section) =>
    section.trim().startsWith("Pieces of Evidence")
  )

  if (snippetsSection) {
    const snippetRegex = /### Evidence \d+\nContent: ([\s\S]*?)\nSource: (\d+)/g
    let match
    while ((match = snippetRegex.exec(snippetsSection)) !== null) {
      const content = match[1].trim()
      const sourceIndex = parseInt(match[2], 10)
      if (sourceIndex >= 0 && sourceIndex < sourceMetadatas.length) {
        snippets.push({
          content: content,
          url: sourceMetadatas[sourceIndex].url,
          hostname: sourceMetadatas[sourceIndex].hostname,
          title: sourceMetadatas[sourceIndex].title,
        })
      }
    }
  }

  const categorySection = sections.find((section) =>
    section.trim().startsWith("Category")
  )
  if (categorySection) {
    const categoryMatch = categorySection.match(/Category\n(.*)/i)
    if (categoryMatch) {
      const categoryString = categoryMatch[1].trim().toUpperCase()
      switch (categoryString) {
        case "SUPPORTED":
          category = ClaimCategory.EvalSupported
          break
        case "DOUBTED":
          category = ClaimCategory.EvalDoubted
          break
        case "UNKNOWN":
          category = ClaimCategory.EvalUncertain
          break
        default:
          console.error(
            `Got an unexpected category from LLM response: ${categoryString}`
          )
          category = ClaimCategory.EvalUncertain
          break
      }
    } else {
      throw new Error(
        `Could not match category in category section: ${categorySection}`
      )
    }
  }

  return { snippets, category }
}
