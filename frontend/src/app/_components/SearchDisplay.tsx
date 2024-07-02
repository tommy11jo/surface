"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LOADING_STATE } from "./SearchInput";

import { type SourceMetadata, type Snippet, type Theme } from "./types";
import { searchExamplesList } from "./searchExamples";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { useSecretCode } from "../secretContext";

interface SearchDisplayProps {
  query: string;
  isExample: boolean;
  hardRefresh: boolean;
  setStatusText: (value: string) => void;
}

export function SearchDisplay({
  query,
  isExample,
  hardRefresh,
  setStatusText,
}: SearchDisplayProps) {
  const { secretCode } = useSecretCode();

  const [sourceMetadatas, setSourceMetadatas] = useState<SourceMetadata[]>([]);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isThemeOpenList, setIsThemeOpenList] = useState<boolean[]>([]);

  const dataFetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (isExample) {
      const curExample = searchExamplesList.find(
        (example) => example.query === query,
      );
      if (!curExample) throw Error("Invalid example provided in url");
      return curExample;
    }

    if (!secretCode || !query) {
      return null;
    }

    setStatusText(LOADING_STATE);
    const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
    if (apiPrefix === undefined) throw new Error("Api prefix is undefined");
    const searchEndpoint = `${apiPrefix}/api/search`;

    try {
      const startTime = performance.now();
      const { data } = await axios.post<{
        sourceMetadatas: SourceMetadata[];
        snippets: Snippet[];
        themes: Theme[];
      }>(searchEndpoint, {
        query: query,
        secret: secretCode,
        hardRefresh: hardRefresh,
      });
      const endTime = performance.now();
      setStatusText(
        `🟢 Complete in ${((endTime - startTime) / 1000).toFixed(2)}s`,
      );
      return data;
    } catch (error) {
      let errorMessage = "Unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setStatusText(`🔴 Error: ${errorMessage}`);
      throw error;
    }
  }, [query, isExample, secretCode, hardRefresh, setStatusText]);
  useEffect(() => {
    if (dataFetchedRef.current) return;

    const loadData = async () => {
      try {
        const data = await fetchData();
        if (data) {
          setSourceMetadatas(data.sourceMetadatas);
          setSnippets(data.snippets);
          setThemes(data.themes);
          dataFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData().catch((error) => {
      console.log("Error loading the data:", error);
    });
  }, [fetchData]);

  useEffect(() => {
    setIsThemeOpenList(themes.map((theme) => theme.relevanceScore > 7));
  }, [themes]);

  const groupedSnippets: Record<string, Snippet[]> = {};
  snippets.forEach((snippet) => {
    if (!groupedSnippets[snippet.themeId]) {
      groupedSnippets[snippet.themeId] = [];
    }
    groupedSnippets[snippet.themeId]!.push(snippet);
  });

  const urlToIndex: Record<string, number> = {};
  sourceMetadatas.forEach((metadata, i) => {
    urlToIndex[metadata.url] = i;
  });

  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="flex w-full border-b border-solid border-dark-sand"></div>
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
                        <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                          <span>{index}</span>
                        </div>
                        {/* eslint-disable @next/next/no-img-element */}
                        <img
                          src={metadata.icon}
                          alt="Icon"
                          className="mr-2 h-6 w-6"
                        />
                        {/* eslint-enable @next/next/no-img-element */}
                        <span className="text-base">{metadata.hostname}</span>
                      </div>
                      <div className="text-xl text-blue-500 group-hover:underline">
                        {metadata.title}
                        {/* dangerously set for ddgs library. */}
                        {/* <div
                          dangerouslySetInnerHTML={{ __html: metadata.title }}
                        /> */}
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
              {themes.map((theme, index) => (
                <div key={theme.id} className="py-3 sm:px-4">
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isThemeOpenList[index])
                        setIsThemeOpenList(
                          isThemeOpenList.map((isThemeOpen, i) =>
                            i === index ? false : isThemeOpen,
                          ),
                        );
                      else
                        setIsThemeOpenList(
                          isThemeOpenList.map((isThemeOpen, i) =>
                            i === index ? true : isThemeOpen,
                          ),
                        );
                    }}
                  >
                    <ChevronRight
                      className="mr-2 inline-block"
                      style={{
                        transform: isThemeOpenList[index]
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    />
                    <h2 className="inline-block select-none text-xl font-semibold">
                      {theme.title}
                    </h2>
                  </div>

                  {isThemeOpenList[index] &&
                    groupedSnippets[theme.id]!.map((snippet) => (
                      <div
                        key={snippet.content}
                        className="flex w-full flex-col"
                      >
                        <div className="group inline-flex max-w-full items-baseline overflow-hidden pl-4 text-sm sm:pl-8">
                          <div className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-300">
                            <span>{urlToIndex[snippet.url]}</span>
                          </div>

                          <a
                            href={snippet.url}
                            className="inline truncate text-gray-500 group-hover:underline"
                          >
                            <span>{snippet.hostname}</span>
                            <span className="pl-1 text-gray-500 group-hover:underline">
                              • {snippet.title}
                            </span>
                          </a>
                        </div>
                        <div className="flex flex-row">
                          <span>• {`"${snippet.content}"`}</span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
