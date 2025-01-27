export enum TokenType {
  Thinking,
  Claim,
  Text,
}

export interface Token {
  type: TokenType;
  content: string;
  searchQuery?: string;
}
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX;
const STREAM_DELIM = "%$%";
export default class ChatStream {
  private visibleTokens: Token[] = [];
  private isStreaming = false;
  private error: Error | null = null;
  private abortController: AbortController | null = null;

  private secretCode: string;
  private numStreams: number;
  private response: string;

  private remainingChunk = "";

  constructor(secretCode: string) {
    this.secretCode = secretCode;
    this.numStreams = 0;
    this.response = "";
  }

  async startStream(query: string, retry: boolean): Promise<void> {
    if (API_PREFIX === undefined) throw new Error("Api prefix is undefined");
    if (this.numStreams >= 2) throw new Error("Num streams should be max 1");
    this.response = "";
    this.numStreams += 1;

    const streamEndpoint = `${API_PREFIX}/api/stream-answer`;
    this.visibleTokens = [];
    this.error = null;
    this.isStreaming = true;

    this.abortController = new AbortController();

    try {
      const res = await fetch(streamEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, secret: this.secretCode, retry }),
        signal: this.abortController.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Failed to create stream reader");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value);
        const lines = buffer.split(STREAM_DELIM);
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              this.isStreaming = false;
              return;
            }
            this.response += data;
            this.processChunk(data);
          }
        }
      }

      if (buffer) {
        this.processChunk(buffer);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          this.error = error;
          console.error("Error:", error.message);
        }
      } else {
        this.error = new Error("An unknown error occurred");
        console.error("Unknown error:", error);
      }
    } finally {
      this.isStreaming = false;
      this.abortController = null;
      this.numStreams -= 1;
    }
  }

  stopStream(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.isStreaming = false;
    }
  }
  // mutates visible tokens by appending new tokens
  private processChunk(chunk: string): Token[] {
    const fullChunk = this.remainingChunk + chunk;
    const tokens = this.visibleTokens;
    this.remainingChunk = "";

    const processContent = (
      content: string,
      type: TokenType,
      searchQuery?: string,
    ) => {
      let query: string;
      if (type === TokenType.Claim) {
        if (!searchQuery) {
          console.error(
            `Claim found without an an associated search query. Using claim content as the quer. Content is: \n${content}`,
          );
          query = content;
        } else {
          query = searchQuery!;
        }
        tokens.push({ type, content, searchQuery: query });
      } else if (type === TokenType.Thinking) {
        tokens.push({ type, content });
      } else {
        if (
          tokens.length > 0 &&
          tokens[tokens.length - 1]!.type === TokenType.Text
        ) {
          tokens[tokens.length - 1]!.content += content;
        } else {
          tokens.push({ type, content });
        }
      }
    };

    let i = 0;
    while (i < fullChunk.length) {
      if (fullChunk[i] === "<") {
        const closingIndex = fullChunk.indexOf(">", i);
        if (closingIndex === -1) {
          this.remainingChunk = fullChunk.slice(i);
          break;
        }

        const tag = fullChunk.slice(i + 1, closingIndex);
        const closingTag = `</${tag}>`;
        const closingTagIndex = fullChunk.indexOf(closingTag, closingIndex);

        if (closingTagIndex === -1) {
          this.remainingChunk = fullChunk.slice(i);
          break;
        }

        const content = fullChunk.slice(closingIndex + 1, closingTagIndex);
        if (tag === "claim") {
          const searchQueryMatch = content.match(
            /<requestCitation googleSearchQuery="([^"]+)" \/>/,
          );
          const claimContent = searchQueryMatch
            ? content.replace(searchQueryMatch[0], "").trim()
            : content;
          const searchQuery = searchQueryMatch
            ? searchQueryMatch[1]
            : undefined;

          processContent(claimContent, TokenType.Claim, searchQuery);
        } else if (tag === "thinking") {
          processContent(content, TokenType.Thinking);
        } else {
          throw new Error(
            `Malformed direct answer response chunk: ${fullChunk}`,
          );
        }

        i = closingTagIndex + closingTag.length;
      } else {
        const nextTagIndex = fullChunk.indexOf("<", i);
        if (nextTagIndex === -1) {
          processContent(fullChunk.slice(i), TokenType.Text);
          break;
        } else {
          processContent(fullChunk.slice(i, nextTagIndex), TokenType.Text);
          i = nextTagIndex;
        }
      }
    }

    return tokens;
  }

  getState(): {
    visibleTokens: Token[];
    isStreaming: boolean;
    error: Error | null;
    response: string;
  } {
    return {
      visibleTokens: this.visibleTokens,
      isStreaming: this.isStreaming,
      error: this.error,
      response: this.response,
    };
  }
}
