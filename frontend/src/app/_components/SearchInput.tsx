"use client";

import { useEffect, useState } from "react";

type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  statusText: string;
  setStatusText: (value: string) => void;
};
export const LOADING_STATE = "🟡 Loading (typically 5 to 9 seconds)";
export const IDLE_STATE = "🟢 Search the web (typically 5 to 9 seconds)";

export function SearchInput({
  query,
  setQuery,
  statusText,
  setStatusText,
}: SearchInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef) inputRef.focus();
  }, [inputRef]);

  const handleSearch = () => {
    if (query.length >= 200) {
      setStatusText("🔴 Query must be <200 chars.");
      return;
    } else if (query.length === 0) {
      setStatusText("🔴 Query cannot be empty");
      return;
    }
    const encodedQuery = encodeURIComponent(query);
    window.location.href = `/search?q=${encodedQuery}`;
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch();
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
          className="w-full rounded-lg border border-gray-500 p-2 pl-10 text-base focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-96"
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
