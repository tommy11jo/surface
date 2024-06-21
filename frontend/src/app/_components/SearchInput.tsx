"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// copied from backend
export type SourceMetadata = {
  url: string;
  title: string;
  icon: string;
  hostname: string;
  textContent: string | undefined;
  summary?: string;
};
type SearchInputProps = {
  setSourceMetadatas: (value: SourceMetadata[]) => void;
};

export function SearchInput({ setSourceMetadatas }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [statusText, setStatusText] = useState("🟢 Search");

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
      }
      setStatusText("🟡 Loading...");
      setSourceMetadatas([]);
      try {
        const startTime = performance.now();
        const results = await generateSourceMetadatas(query);
        const endTime = performance.now();
        setStatusText(
          `🟢 Complete in ${((endTime - startTime) / 1000).toFixed(2)}s`,
        );
        setSourceMetadatas(results);
      } catch (error) {
        let errorMessage = "Unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setStatusText(`🔴 Error: ${errorMessage}`);
      }
      setQuery("");
    }
  };

  const generateSourceMetadatas = async (query: string) => {
    try {
      const response = await axios.post("http://localhost:8000/api/search", {
        query,
      });
      return response.data as SourceMetadata[];
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      throw error;
    }
  };

  return (
    <div className="relative flex flex-col items-start">
      <div className="relative w-full">
        <span className="absolute left-3 top-2 text-gray-500">🔎</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={setInputRef}
          spellCheck={false}
          className="w-full rounded-lg border border-gray-500 p-2 pl-10 text-lg focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-96"
        />
      </div>
      <div className="mt-2 text-base text-gray-400">{statusText}</div>
    </div>
  );
}
