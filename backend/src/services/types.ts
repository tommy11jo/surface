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
