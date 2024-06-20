"use client";

import { useEffect, useState } from "react";
export type SearchPreviewData = {
  title: string;
  favicon: string;
  url: string;
  summary?: string;
};

type SearchInputProps = {
  setResults: (results: SearchPreviewData[]) => void;
};

export function SearchInput({ setResults }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef) inputRef.focus();
  }, [inputRef]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      console.log("do the search here");
      setQuery("");
      const result = {
        title: `query ${query}`,
        url: "url",
        favicon: "favicon",
      };
      setResults([result]);
    }
  };

  return (
    <div className="relative flex flex-row items-center">
      <span className="absolute left-3 text-gray-500">🔎</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={setInputRef}
        spellCheck={false}
        className="rounded-lg border border-gray-500 p-2 pl-10 text-lg focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-96"
      />
    </div>
  );
}
