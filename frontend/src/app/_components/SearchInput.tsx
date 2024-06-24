"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { type SourceMetadata, type Snippet } from "./types";
import { useRouter } from "next/navigation";

type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  setSourceMetadatas: (value: SourceMetadata[]) => void;
  setSnippets: (value: Snippet[]) => void;
};

const LOADING_STATE = "🟡 Loading...";
const IDLE_STATE = "🟢 Search";
export function SearchInput({
  query,
  setQuery,
  setSourceMetadatas,
  setSnippets,
}: SearchInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [statusText, setStatusText] = useState(IDLE_STATE);
  const router = useRouter();

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
    setSnippets([]);
    try {
      const startTime = performance.now();
      const { sourceMetadatas, snippets } =
        await generateSourceMetadatas(query);
      const endTime = performance.now();
      setStatusText(
        `🟢 Complete in ${((endTime - startTime) / 1000).toFixed(2)}s`,
      );
      setSourceMetadatas(sourceMetadatas);
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
    try {
      const { data } = await axios.post<{
        sourceMetadatas: SourceMetadata[];
        snippets: Snippet[];
      }>("http://localhost:8000/api/search", {
        query,
      });
      return { sourceMetadatas: data.sourceMetadatas, snippets: data.snippets };
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
          className="w-full rounded-lg border border-gray-500 p-2 pl-10 text-lg focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-96"
          placeholder="⛔ Out of order! To 🐌 and 💲 for prod."
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
