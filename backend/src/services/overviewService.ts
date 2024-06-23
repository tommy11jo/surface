import { SourceMetadata, Snippet } from "./types"
import { generateLLMResponse } from "./llmService"

export async function generateSnippets(
  query: string,
  sourceMetadatas: SourceMetadata[],
  maxSourcesToConsider: number = 2,
  maxQuotes: number = 5
) {
  sourceMetadatas = sourceMetadatas.slice(0, maxSourcesToConsider)
  const snippetPrompt = getOverviewPrompt(query, sourceMetadatas)
  const snippetResponse = await generateLLMResponse(snippetPrompt)
  const fuzzyQuotes = extractSnippetsFromResponse(snippetResponse)
  const snippets: Snippet[] = fuzzyQuotes.map((contentAndIndex) => {
    const [theme, content, index] = contentAndIndex
    if (index >= sourceMetadatas.length)
      throw Error("Generated source index for snippet is out of bounds.")
    return {
      url: sourceMetadatas[index].url,
      hostname: sourceMetadatas[index].hostname,
      content: content,
      theme: theme,
    }
  })

  return snippets.slice(0, maxQuotes)
}

function getOverviewPrompt(query: string, sourceMetadatas: SourceMetadata[]) {
  const sourceMetadatasStr = sourceMetadatas
    .map(
      (metadata, i) => `SOURCE ${i}:
${metadata.textContent}
`
    )
    .join("\n\n")
  const prompt = `Your job is to generate 2-3 themes or topics from the texts that are relevant to the user's query.
Each theme is a core point of interest to the user.
Each theme has 1-3 corresponding snippets.
Each snippet is self-contained and informational.
A snippet is typically 1-3 sentences.
A snippet must be a direct quote, exactly matching the original text.
Each snippet should contain a chunk of insight. 

Example format:
## Provided Sources
<source texts>

## User Query
<query>

## Relevant themes 
### <Theme 1 Title>
#### Snippet 1
Content: "<snippet content>"
Source: 1
#### Snippet 2
Content: "<snippet content>"
Source: 3

### <Theme 2 Title>
#### Snippet 3
Content: "<snippet content>"
Source: 3


Now, let's try it out:
## Provided Sources
${sourceMetadatasStr}

## User Query
${query}

## Relevant themes 
`
  return prompt
}

function extractSnippetsFromResponse(
  response: string
): [string, string, number][] {
  const snippets: [string, string, number][] = []

  const themeRegex = /### (.*?)\n(.*?)(?=\n### (?!#)|\n$)/gs
  let themeMatch

  while ((themeMatch = themeRegex.exec(response)) !== null) {
    const theme = themeMatch[1].trim()
    const themeContent = themeMatch[2]

    const snippetRegex = /#### Snippet \d+\nContent: "(.*?)"\nSource: (\d+)/g
    let snippetMatch

    while ((snippetMatch = snippetRegex.exec(themeContent)) !== null) {
      const content = snippetMatch[1]
      const sourceIndex = parseInt(snippetMatch[2], 10)
      snippets.push([theme, content, sourceIndex])
    }
  }

  return snippets
}
