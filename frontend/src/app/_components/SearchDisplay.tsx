"use client";

import { useState } from "react";
import { SearchInput, type SourceMetadata } from "./SearchInput";
type SnippetData = {
  content: string;
};
export function SearchDisplay() {
  const [sourceMetadatas, setSourceMetadatas] = useState<SourceMetadata[]>([]);

  const [snippets, setSnippets] = useState<SnippetData[]>([]);
  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="flex w-full flex-col justify-between gap-2 py-4 sm:flex-row">
        <SearchInput setSourceMetadatas={setSourceMetadatas} />
        <div className="flex flex-col">
          <span>🪸 Find and navigate the coral reefs of the web</span>
          <span>🌐 Personal blogs • Older essays • Forums</span>
        </div>
      </div>
      <div className="flex w-full border-b border-solid border-dark-sand"></div>
      <div className="flex grow flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col items-center sm:w-1/2">
          <div className="flex w-full flex-col py-2">
            <ul>
              {sourceMetadatas.map((metadata) => (
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
                    </div>
                    <div className="text-xl text-blue-500 group-hover:underline">
                      {/* dangerously set for ddgs library */}
                      <div
                        dangerouslySetInnerHTML={{ __html: metadata.title }}
                      />
                    </div>
                  </a>
                  <span>{metadata.summary}</span>
                </li>
              ))}
            </ul>
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
