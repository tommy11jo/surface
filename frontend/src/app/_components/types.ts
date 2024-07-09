// search types
// copied from backend
export type Snippet = {
  url: string;
  hostname: string;
  content: string;
  title: string;
  themeId: string;
  relevanceScore?: number;
};

// copied from backend
export type SourceMetadata = {
  url: string;
  title: string;
  hostname: string;
  icon?: string;
  textContent?: string | undefined;
  summary?: string;
};

export type Theme = {
  id: string;
  title: string;
  relevanceScore: number;
};

// answer types
export type AnswerSnippet = {
  url: string;
  hostname: string;
  title: string;
  content: string;
};

export enum ClaimCategory {
  Correct,
  MaybeCorrect,
  Incorrect,
  Undefined,
  Uncertain,
}

export type ClaimMetadata = {
  snippets: AnswerSnippet[];
  category: ClaimCategory;
  content: string;
  isComplete?: boolean;
};
