// search types
export type SourceMetadata = {
  url: string
  title: string
  icon: string
  hostname: string
  textContent?: string | undefined
  summary?: string
}

export type Snippet = {
  url: string
  hostname: string
  title: string
  content: string
  themeId: string
}

export type Theme = {
  id: string
  title: string
  relevanceScore: string
}

// answer types
export type AnswerSnippet = {
  url: string
  hostname: string
  title: string
  content: string
}

export enum ClaimCategory {
  Correct,
  ApproxCorrect,
  Incorrect,
  Undefined,
  Uncertain,
}

export type ClaimMetadata = {
  snippets: AnswerSnippet[]
  category: ClaimCategory
  distinctions: string[]
  content: string
}
