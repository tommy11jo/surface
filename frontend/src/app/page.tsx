"use client";
import { useState } from "react";
import { IDLE_STATE, SearchInput } from "./_components/SearchInput";
import { searchExamplesList } from "./_components/searchExamples";
import Link from "next/link";

export default function Home() {
  const [statusText, setStatusText] = useState(IDLE_STATE);
  const [tempQuery, setTempQuery] = useState("");
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-start px-2 py-2">
      <div className="flex w-full flex-col justify-between gap-2 py-4 sm:flex-row">
        <SearchInput
          query={tempQuery}
          setQuery={setTempQuery}
          statusText={statusText}
          setStatusText={setStatusText}
        />
        <div className="flex flex-col">
          <span>🌐 High-Quality, Info-Packed Search Results</span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start">
        <div>
          <span className="font-semibold">Examples:</span>
        </div>
        {searchExamplesList.map((example, index) => {
          return (
            <div key={example.query + index}>
              <Link
                href={`/search?isExample=true&q=${encodeURIComponent(example.query)}`}
                className="text-blue-500 hover:underline"
              >
                → {example.query}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
