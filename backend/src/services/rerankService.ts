import { SourceMetadata } from "./types"

export function getRerankPrompt(
  sourceMetadatas: SourceMetadata[],
  query: string
) {
  const sourceListStr = sourceMetadatas
    .map(
      (metadata, index) => `Source ${index}
Url: ${metadata.url}
Title: ${metadata.title}`
    )
    .join("\n\n")

  const prompt = `The documents below have been ordered by google search.
Your job is to help reorder them.
You will score each source with two numbers:
1. Content score - a number from 1-10 for the relevance of the source to the query.
2. User score - a number from 1-10 for the quality of the source to the user.

However, if a source is not relevant, then you do not need to score it. Just leave it out.
If you are unsure, use 5 as the score.

Imagine the user as the average hacker news reader.
They prefer content that is informative, interesting, or data-driven such as slatestarcodex.
They prefer blogs, forums, or trusted websites that are likely to have relevant content.

Example format:
## Sources
### Source 0:
<Source 0 info>
### Source 1:
<Source 1 info>
…
### Source 10:
<Source 10 info>
Question: <question>
Answer:
### Relevance scores
## Source 0
Content: 4
User: 6
## Source 1
Content: 10
User: 7
## Source 4
Content: 9
User: 3
## Source 6:
Content: 5
User: 9

Let's try this now:
${sourceListStr}
Question: ${query}
Answer:
### Relevance scores
`
  console.log("rerank prompt", prompt)
  return prompt
}

export async function extractRanksFromResponse(
  response: string
): Promise<[number, number, number][]> {
  const rerankScores: [number, number, number][] = []
  const regex = /## Source (\d+)\s+Content:\s*(\d+)\s*User:\s*(\d+)/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(response)) !== null) {
    const sourceNum = parseInt(match[1], 10)
    const contentScore = parseInt(match[2], 10)
    const userScore = parseInt(match[3], 10)
    rerankScores.push([sourceNum, contentScore, userScore])
  }

  return rerankScores
}

export function orderByScores(scores: [number, number, number][]): number[] {
  return scores
    .map(([source, contentScore, userScore]) => ({
      source,
      finalScore: contentScore * userScore,
    }))
    .sort((a, b) => b.finalScore - a.finalScore)
    .map((item) => item.source)
}
