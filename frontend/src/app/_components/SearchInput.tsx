"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { type SourceMetadata, type Snippet, type Theme } from "./types";
import { useRouter } from "next/navigation";
import { useSecretCode } from "../secretContext";

type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  setSourceMetadatas: (value: SourceMetadata[]) => void;
  setSnippets: (value: Snippet[]) => void;
  setThemes: (value: Theme[]) => void;
};

const LOADING_STATE = "🟡 Loading (typically 5 to 9 seconds)";
const IDLE_STATE = "🟢 Search the web (typically 5 to 9 seconds)";
export function SearchInput({
  query,
  setQuery,
  setSourceMetadatas,
  setSnippets,
  setThemes,
}: SearchInputProps) {
  const { secretCode } = useSecretCode();
  const router = useRouter();

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [statusText, setStatusText] = useState(IDLE_STATE);

  useEffect(() => {
    if (inputRef) inputRef.focus();
  }, [inputRef]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      if (query.length >= 200) {
        setStatusText("🔴 Query must be <200 chars.");
        return;
      } else if (query.length === 0) {
        setStatusText("🔴 Query cannot be empty");
        return;
      }
      await handleSearch();
    }
  };
  const handleSearch = async () => {
    setStatusText(LOADING_STATE);
    setSourceMetadatas([]);
    setThemes([]);
    setSnippets([]);
    try {
      const startTime = performance.now();
      const { sourceMetadatas, snippets, themes } =
        await generateSourceMetadatas(query);
      const endTime = performance.now();
      setStatusText(
        `🟢 Complete in ${((endTime - startTime) / 1000).toFixed(2)}s`,
      );
      setSourceMetadatas(sourceMetadatas);
      setThemes(themes);
      setSnippets(snippets);
      router.push(`/?example=false&q=${encodeURIComponent(query)}`);
    } catch (error) {
      let errorMessage = "Unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setStatusText(`🔴 Error: ${errorMessage}`);
    }
  };

  const generateSourceMetadatas = async (query: string) => {
    const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
    const searchEndpoint = `${apiPrefix}/api/search`;
    try {
      const { data } = await axios.post<{
        sourceMetadatas: SourceMetadata[];
        snippets: Snippet[];
        themes: Theme[];
      }>(searchEndpoint, {
        query,
        secret: secretCode,
      });
      return {
        sourceMetadatas: data.sourceMetadatas,
        snippets: data.snippets,
        themes: data.themes,
      };
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      throw error;
    }
  };

  return (
    <div className="relative flex flex-col items-start">
      <div className="relative m-0 flex w-full">
        <span className="absolute left-3 top-2 text-gray-500">🔎</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={setInputRef}
          spellCheck={false}
          disabled={statusText === LOADING_STATE}
          className="w-full rounded-lg border border-gray-500 p-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-96 sm:text-base"
        />
        <button
          onClick={handleSearch}
          className="mx-2 flex flex-shrink-0 rounded bg-sand p-2 font-semibold hover:bg-dark-sand"
        >
          Go →
        </button>
      </div>
      <div className="mt-2 text-base text-gray-400">{statusText}</div>
    </div>
  );
}
