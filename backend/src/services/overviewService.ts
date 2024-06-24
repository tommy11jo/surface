import { SourceMetadata, Snippet } from "./types"
import { generateLLMResponse } from "./llmService"

export async function generateSnippets(
  query: string,
  sourceMetadatas: SourceMetadata[],
  maxSourcesToConsider: number = 3,
  // maxSourcesToConsider: number = 2,
  maxQuotes: number = 5,
  log: boolean = true
) {
  sourceMetadatas = sourceMetadatas.slice(0, maxSourcesToConsider)
  const overviewPrompt = getOverviewPrompt(query, sourceMetadatas)
  const overviewStartTime = Date.now()
  const overviewResponse = await generateLLMResponse(overviewPrompt)
  const overviewEndTime = Date.now()
  if (log) {
    const overviewTime = overviewEndTime - overviewStartTime
    console.log(`Total overview time: ${overviewTime / 1000}s`)
  }
  const fuzzyQuotes = extractSnippetsFromResponse(overviewResponse)
  const snippets: Snippet[] = fuzzyQuotes.map((contentAndIndex) => {
    const [theme, content, index] = contentAndIndex
    if (index >= sourceMetadatas.length)
      throw Error("Generated source index for snippet is out of bounds.")
    return {
      url: sourceMetadatas[index].url,
      hostname: sourceMetadatas[index].hostname,
      title: sourceMetadatas[index].title,
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
  const prompt = `Your job is to write a good overview given the user's query.
Generate 2-3 themes or topics that are directly relevant or are likely of interest.

Themes:
Each theme is a core point of interest to the user.
Each theme has 1-3 corresponding snippets.

Snippets:
Each snippet should contain a unique chunk of insight. 
Each snippet is self-contained and informational.
A snippet is typically 1-3 sentences.
A snippet must be a direct quote, exactly matching the original text.
A snippet can contain non-consecutive sentences, by using an elipsis (e.g. <intro context>... <main point>)

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
