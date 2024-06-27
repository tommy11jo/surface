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

Imagine the user is smart and rational.
The user prefers content that is informative, interesting, or data-driven.
The user prefers:
- well-known blogs or thoughtful personal blogs
- trusted news sites
- expert opinions
- forums like reddit

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
## Relevance scores
### Source 0
Content: 4
User: 6
### Source 1
Content: 10
User: 7
### Source 4
Content: 9
User: 3
### Source 6:
Content: 5
User: 9

Let's try this now:
${sourceListStr}
Question: ${query}
Answer:
### Relevance scores
`
  return prompt
}

export async function extractScores(
  response: string
): Promise<[number, number, number][]> {
  const rerankScores: [number, number, number][] = []
  const regex = /### Source (\d+)\s+Content:\s*(\d+)\s*User:\s*(\d+)/g
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

export function getRerankPromptAlt(sources: SourceMetadata[], query: string) {
  return `Rate sources 1-10 for relevance and quality.
Blogs, trusted news sites, expert opinions, and reddit should score high.
Act like every word costs you.
Your explanations should be less short phrases. 
Each explanation should be less than 7 words.

Example Format: 
# Source Info
<info>
# Query: <query>
# Ratings:
## Source1: <Score> (<short explanation>)
## Source2: <Score> (<short explanation>)
...

Now, let's try it out:
${sources.map((s, i) => `## Source${i}: ${s.url} - ${s.title}`).join("\n")}
# Query: ${query}
# Ratings:`
}

export function extractScoresAlt(response: string): number[][] {
  const ratingsSection = response.split("# Ratings:")[1] || ""
  const regex = /## Source(\d+):\s*(\d+)/g
  const matches = [...ratingsSection.matchAll(regex)]
  return matches.map((match) => [Number(match[1]), Number(match[2])])
}

export const orderByScoresAlt = (scores: number[][]) =>
  scores.sort((a, b) => b[1] - a[1]).map((s) => s[0])
