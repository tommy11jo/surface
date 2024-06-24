"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";

import { type SourceMetadata, type Snippet } from "./types";
import { type SearchExample, searchExamplesList } from "./searchExamples";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function SearchDisplay() {
  const [sourceMetadatas, setSourceMetadatas] = useState<SourceMetadata[]>([]);

  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const [query, setQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchExample = (example: SearchExample) => {
    router.push(`/example=true&q=${encodeURIComponent(example.query)}`);
  };
  useEffect(() => {
    const exampleParam = searchParams.get("example");
    if (exampleParam === "false") return;
    const isExample = exampleParam === "true";
    if (!isExample) {
      setSourceMetadatas([]);
      setSnippets([]);
      setQuery("");
      return;
    }
    const encodedQuery = searchParams.get("q");
    const decodedQuery =
      encodedQuery === null ? null : decodeURIComponent(encodedQuery);
    const curExample = searchExamplesList.find(
      (example) => example.query === decodedQuery,
    );
    if (!curExample) throw Error("Invalid example provided in url");
    setSourceMetadatas(curExample.sourceMetadatas);
    setSnippets(curExample.snippets);
    setQuery(curExample.query);
  }, [searchParams]);

  const groupedSnippets: Record<string, Snippet[]> = {};
  snippets.forEach((snippet) => {
    if (!groupedSnippets[snippet.theme]) {
      groupedSnippets[snippet.theme] = [];
    }
    groupedSnippets[snippet.theme]!.push(snippet);
  });
  console.log(sourceMetadatas);
  console.log(snippets);

  const urlToIndex: Record<string, number> = {};
  sourceMetadatas.forEach((metadata, i) => {
    urlToIndex[metadata.url] = i;
  });
  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="flex w-full flex-col justify-between gap-2 py-4 sm:flex-row">
        <SearchInput
          query={query}
          setQuery={setQuery}
          setSourceMetadatas={setSourceMetadatas}
          setSnippets={setSnippets}
        />
        <div className="flex flex-col">
          <span>
            🌐 A search interface for high quality, information dense results
          </span>
        </div>
      </div>
      <div className="flex w-full border-b border-solid border-dark-sand"></div>
      {sourceMetadatas.length === 0 && query.length === 0 && (
        <div>
          <div>
            <span className="font-semibold">Examples:</span>
          </div>
          {searchExamplesList.map((example, index) => {
            return (
              <div key={example.query + index}>
                <Link
                  href={`?example=true&q=${encodeURIComponent(example.query)}`}
                  onClick={() => handleSearchExample(example)}
                  className="text-blue-500 hover:underline"
                >
                  → {example.query}
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex grow flex-col-reverse gap-4 sm:flex-row">
        {sourceMetadatas.length > 0 && (
          <div className="flex w-full flex-col items-center sm:w-1/2">
            <div className="flex w-full flex-col py-2">
              <div className="flex w-full justify-center py-2 underline">
                Results
              </div>
              <ul className="px-2">
                {sourceMetadatas.map((metadata, index) => (
                  <li key={metadata.url} className="mb-4">
                    <a href={metadata.url} className="group">
                      <div className="mb-2 flex items-center">
                        {/* eslint-disable @next/next/no-img-element */}
                        <img
                          src={metadata.icon}
                          alt="Icon"
                          className="mr-2 h-6 w-6"
                        />
                        {/* eslint-enable @next/next/no-img-element */}
                        <span className="text-base">{metadata.hostname}</span>
                        <div className="ml-auto mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                          <span>{index}</span>
                        </div>
                      </div>
                      <div className="text-xl text-blue-500 group-hover:underline">
                        {/* dangerously set for ddgs library */}
                        <div
                          dangerouslySetInnerHTML={{ __html: metadata.title }}
                        />
                      </div>
                    </a>
                    {metadata.summary && metadata.summary.length > 0 && (
                      <div>
                        <span className="pr-2">≡</span>
                        <span>{metadata.summary}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {snippets.length > 0 && (
          <div className="flex w-full flex-col border-l border-none border-dark-sand sm:w-1/2 sm:border-solid">
            <div className="flex w-full justify-center py-2 underline">
              Overview
            </div>
            <ul className="px-2">
              {Object.keys(groupedSnippets).map((theme) => (
                <li key={theme} className="py-3 sm:px-4">
                  <h2 className="text-xl font-semibold">{theme}</h2>
                  <ul>
                    {groupedSnippets[theme]!.map((snippet) => (
                      <li key={snippet.content} className="py-2">
                        <div className="flex w-full flex-col">
                          <div className="group inline-flex items-baseline pl-4 text-sm sm:pl-8">
                            <div className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
                              <span>{urlToIndex[snippet.url]}</span>
                            </div>

                            <a
                              href={snippet.url}
                              className="inline text-gray-500 group-hover:underline"
                            >
                              <span>{snippet.hostname}</span>
                              <span className="pl-1 text-gray-500 group-hover:underline sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
                                • {snippet.title}
                              </span>
                            </a>
                          </div>
                          <div className="flex flex-row">
                            <span>• {`"${snippet.content}"`}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
