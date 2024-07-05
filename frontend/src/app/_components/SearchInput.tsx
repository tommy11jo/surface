"use client";
import { type ChangeEvent, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  statusText: string;
  setStatusText: (value: string) => void;
  secretCode: string;
  secretLoading: boolean;
  showRetry: boolean;
};

export const LOADING_STATE = "🟡 Loading (typically 7 to 11 seconds)";
export const IDLE_STATE = "🟢 Search the web (typically 7 to 11 seconds)";

export function SearchInput({
  query,
  setQuery,
  statusText,
  setStatusText,
  secretCode,
  secretLoading,
  showRetry,
}: SearchInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (secretCode === "") setStatusText("🔴 Enter a code to use");
    else setStatusText(IDLE_STATE);
  }, [secretCode]);

  const handleClear = () => {
    setQuery("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSearch = (retry = false) => {
    if (query.length >= 200) {
      setStatusText("🔴 Query must be <200 chars.");
      return;
    } else if (query.length === 0) {
      setStatusText("🔴 Query cannot be empty");
      return;
    }
    const encodedQuery = encodeURIComponent(query);
    const searchParams = new URLSearchParams({
      q: encodedQuery,
      retry: retry.toString(),
    });
    window.location.href = `/search?${searchParams.toString()}`;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative flex w-full flex-col items-start">
      {showRetry && (
        <button
          onClick={() => handleSearch(true)}
          className="mx-2 inline-flex text-sm font-semibold text-gray-600 hover:underline"
        >
          Retry ↻
        </button>
      )}
      <div className="m-0 flex w-full">
        <div className="relative flex grow sm:grow-0">
          <span className="absolute left-3 top-2 text-gray-500">🔎</span>
          <TextareaAutosize
            value={query}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setQuery(e.target.value)
            }
            onKeyDown={handleKeyDown}
            ref={textareaRef}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full overflow-y-auto rounded-lg border border-gray-500 p-2 pl-10 text-base focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-[30rem]"
            placeholder="Search"
            rows={1}
            maxRows={8}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <span>X</span>
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch()}
          className="ml-2 h-10 flex-shrink-0 whitespace-nowrap rounded bg-sand px-4 font-semibold hover:bg-dark-sand"
        >
          Go →
        </button>
      </div>
      <div className="flex w-full flex-row items-end justify-between">
        <div className="mt-2 text-base text-gray-400">{statusText}</div>
      </div>
    </div>
  );
}
