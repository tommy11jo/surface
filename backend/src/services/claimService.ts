import { getTextContent, searchByBing } from "./searchService"
import {
  AnswerSnippet,
  ClaimMetadata,
  ClaimCategory,
  SourceMetadata,
} from "./types"
import { generateFireworkResponse } from "./llmService"

export const generateClaimEval = async (
  claim: string,
  context: string,
  numSources: number = 3,
  approxWordsCutoff: number = 1400,
  jinaTimeout: number = 7000,
  log = true
): Promise<ClaimMetadata | null> => {
  // TODO: maybe add an LLM step to generate a search
  const sourceMetadatas: SourceMetadata[] = await searchByBing(
    claim,
    numSources
  )
  if (log) console.log(`[INFO] Found ${sourceMetadatas.length} sources.`)
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
  const prompt = `Your job is to pinpoint 0 to 2 relevant snippets from the sources.
Each snippet should **directly** support or counter the claim below.
If a snippet does not clearly relate to the claim, don't include it!

Then, based on the snippets, you will categorize the claim as one of these four categories:
- CORRECT
- INCORRECT
- SOMEWHAT CORRECT
- UNCERTAIN

Let's review the four categories:
- CORRECT - The claim is true. It is not "misleading".
- INCORRECT - The claim is false or is misleading in some fundamental way.
- SOMEWHAT CORRECT - The claim is true as a whole but it is slightly misleading, missing a distinction, or moderately inaccurate.
- UNCERTAIN - The snippet evidence is not clear enough to evaluate the claim.

Example format:
## Sources
<source texts>

## Claim
<claim>
 
## Snippets
### Snippet 1
Content: "<snippet content>"
Source: 0

### Snippet 2
Content: "<snippet content>"
Source: 3

## Category
<one of the four categories>

Now, let's try it out:
## Sources
${sourceMetadatasStr}

## Claim
${claim}

`
  const response = await generateFireworkResponse(prompt)
  const { snippets, category } = extractClaimData(response, sourceMetadatas)

  return {
    snippets,
    category,
    distinctions: [],
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
    section.trim().startsWith("Snippets")
  )

  if (snippetsSection) {
    const snippetRegex =
      /### Snippet \d+\nContent: "([\s\S]*?)"\nSource: (\d+)/g
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
          category = ClaimCategory.ApproxCorrect
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
