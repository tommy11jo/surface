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
  numSources: number = 3,
  approxWordsCutoff: number = 1800,
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
Act like every word costs you money. 
Be purely informational.

Output 0 to 3 pieces of evidence from the sources that support or counter the provided claim.
Each piece of evidence should be 1-2 sentences.
Most pieces of evidence should be a direct quote but paraphasing is allowed when it adds clarity.

You should emphasize evidence that subtly counters the claim or adds nuance.
Only show evidence that clearly adds informational value.
If you do not see any directly relevant info, output "No proof found" in the Proof section.

Then, based solely on the pieces of evidence, you will categorize the claim as one of these four categories:
- UNCERTAIN
- CORRECT
- SOMEWHAT CORRECT
- INCORRECT

Let's review the four categories:
- UNCERTAIN - The pieces of evidence do not sufficiently prove or disprove the claim. The evidence might be related but it is not direct.
- CORRECT - The claim is definitely true and is directly proved by very specific evidence.
- SOMEWHAT CORRECT - The claim is true as a whole but is a bit off. It might be slightly misleading or inaccurate.
- INCORRECT - The claim is false or strongly misleading. The evidence is directly relevant to the situation implied by the claim and the evidence directly contradicts the claim. You must be **very confident** to choose this category.

Example format:
## Claim to verify
<claim>

## Sources
<source texts>
 
## Proof
### Evidence 1
Content: <content>
Source: 0

### Evidence 2
Content: <content>
Source: 3

## Category
<one of the four categories>

Now, let's try it out:
## Claim to verify
${claim}

## Sources
${sourceMetadatasStr}

`
  const response = await generateLLMResponse(prompt)
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
  let category: ClaimCategory = ClaimCategory.Uncertain

  const sections = response.split(/^##\s/m).filter((section) => section.trim())

  const snippetsSection = sections.find((section) =>
    section.trim().startsWith("Proof")
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
        case "CORRECT":
          category = ClaimCategory.Correct
          break
        case "INCORRECT":
          category = ClaimCategory.Incorrect
          break
        case "SOMEWHAT CORRECT":
          category = ClaimCategory.MaybeCorrect
          break
        case "UNCERTAIN":
          category = ClaimCategory.Uncertain
          break
        default:
          category = ClaimCategory.Undefined
          break
      }
    }
  }

  return { snippets, category }
}
