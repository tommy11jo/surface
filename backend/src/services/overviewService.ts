import { SourceMetadata, Snippet, Theme } from "./types"
import { generateLLMResponse } from "./llmService"
import { randId } from "../utils/generateId"
export async function generateOverview(
  query: string,
  sourceMetadatas: SourceMetadata[],
  maxSourcesToConsider: number = 3,
  // maxSourcesToConsider: number = 2,
  log: boolean = true
): Promise<{
  snippets: Snippet[]
  themes: Theme[]
}> {
  sourceMetadatas = sourceMetadatas.slice(0, maxSourcesToConsider)
  const overviewPrompt = getOverviewPrompt(query, sourceMetadatas)
  const overviewStartTime = Date.now()
  const overviewResponse = await generateLLMResponse(overviewPrompt)
  const overviewEndTime = Date.now()
  if (log) {
    const overviewTime = overviewEndTime - overviewStartTime
    console.log(`[INFO] Total overview generation: ${overviewTime / 1000}s`)
  }
  return extractSnippetsFromResponse(overviewResponse, sourceMetadatas)
}

function getOverviewPrompt(query: string, sourceMetadatas: SourceMetadata[]) {
  // TODO: maybe add title and hostname for LLM to see
  const sourceMetadatasStr = sourceMetadatas
    .map(
      (metadata, i) => `SOURCE ${i}:
${metadata.textContent}
`
    )
    .join("\n\n")
  const prompt = `Your job is to write a good overview given the user's query.
Generate 2-4 themes or topics that are directly relevant or likely of interest.

Themes:
Each theme is a core point of interest to the user.
Each theme has 1-3 corresponding snippets.
Each theme has a relevance score that is 0-10. 
A score of 10 means that the theme and its snippets will directly answer the query.
A score of 5 means the theme and its snippets are adjacent but not essential.

Snippets:
Each snippet should contain a unique chunk of relevant insight. 
Each snippet is self-contained and informational and directly relevant.
A snippet is typically 1-3 sentences.
A snippet must be a direct quote, exactly matching the original text.
A snippet can contain non-consecutive sentences, by using an elipsis (e.g. <intro context>... <main point>)

Example format:
## Provided Sources
<source texts>

## User Query
<query>

## Relevant themes 
### Theme 1: <theme title>
#### Snippet 1
Content: "<snippet content>"
Source: 1
#### Snippet 2
Content: "<snippet content>"
Source: 3
#### Theme Relevance: <score 0-10>

### Theme 2: <theme title>
#### Snippet 3
Content: "<snippet content>"
Source: 3
#### Theme Relevance: <score 0-10>


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
  response: string,
  sourceMetadatas: SourceMetadata[]
): {
  snippets: Snippet[]
  themes: Theme[]
} {
  const snippets: Snippet[] = []
  const themes: Theme[] = []

  const themeRegex =
    /### Theme \d+: (.*?)\n+([\s\S]*?)#### Theme Relevance: (\d+)/g
  let themeMatch

  while ((themeMatch = themeRegex.exec(response)) !== null) {
    const theme = themeMatch[1].trim()
    const relevanceScore = themeMatch[3]
    const themeContent = themeMatch[2]
    const themeId = randId()
    themes.push({ id: themeId, title: theme, relevanceScore })

    const snippetRegex = /#### Snippet \d+\nContent: "(.*?)"\nSource: (\d+)/g
    let snippetMatch

    while ((snippetMatch = snippetRegex.exec(themeContent)) !== null) {
      const content = snippetMatch[1]
      const sourceIndex = parseInt(snippetMatch[2], 10)
      if (sourceIndex >= sourceMetadatas.length)
        throw Error("Generated source index for snippet is out of bounds.")
      snippets.push({
        url: sourceMetadatas[sourceIndex].url,
        hostname: sourceMetadatas[sourceIndex].hostname,
        title: sourceMetadatas[sourceIndex].title,
        content,
        themeId,
      })
    }
  }

  return { snippets, themes }
}
