"use client";

import { useState } from "react";
import { SearchInput, type SearchPreviewData } from "./SearchInput";
type SnippetData = {
  content: string;
};
export function SearchDisplay() {
  const [results, setResults] = useState<SearchPreviewData[]>([]);
  const [snippets, setSnippets] = useState<SnippetData[]>([]);
  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="flex w-full flex-col justify-between gap-2 py-4 sm:flex-row">
        <SearchInput setResults={setResults} />
        <div className="flex flex-col">
          <span>🪸 Find and navigate the coral reefs of the web</span>
          <span>🌐 Older essays • Personal blogs • Forums</span>
        </div>
      </div>
      <div className="flex w-full border-b border-solid border-dark-sand"></div>
      <div className="flex grow flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col items-center sm:w-1/2">
          <div className="flex w-full justify-center py-2 font-semibold">
            Results
          </div>
        </div>
        {snippets.length > 0 && (
          <div className="flex w-full border-l border-solid border-dark-sand sm:w-1/2">
            <div className="flex w-full justify-center py-2 font-semibold">
              Snippets
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
