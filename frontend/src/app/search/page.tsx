"use client";
import { useState } from "react";
import { IDLE_STATE, SearchInput } from "../_components/SearchInput";
import { searchExamplesList } from "../_components/searchExamples";
import Link from "next/link";
import { useSecretCode } from "../secretContext";
import { useSearchParams } from "next/navigation";
import { SearchDisplay } from "../_components/SearchDisplay";
import { type SourceMetadata } from "../_components/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const encodedQuery = searchParams.get("q") ?? "";
  const query = decodeURIComponent(encodedQuery);
  const isExample = searchParams.get("isExample") === "true";
  const retry = searchParams.get("retry") === "true";

  const { secretCode } = useSecretCode();
  const [sourceMetadatas, setSourceMetadatas] = useState<SourceMetadata[]>([]);
  const [statusText, setStatusText] = useState(IDLE_STATE);
  const [tempQuery, setTempQuery] = useState("");
  return (
    <div className="flex w-full max-w-7xl flex-col items-center px-2 py-6 sm:px-12">
      <SearchInput
        query={tempQuery}
        setQuery={setTempQuery}
        statusText={statusText}
        setStatusText={setStatusText}
        secretCode={secretCode}
        showRetry={sourceMetadatas.length > 0}
      />
      {query !== "" ? (
        <SearchDisplay
          query={query}
          isExample={isExample}
          retry={retry}
          setStatusText={setStatusText}
          sourceMetadatas={sourceMetadatas}
          setSourceMetadatas={setSourceMetadatas}
        />
      ) : (
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
      )}
    </div>
  );
}
