// copied from backend
export type Snippet = {
  url: string;
  hostname: string;
  content: string;
  theme: string;
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
