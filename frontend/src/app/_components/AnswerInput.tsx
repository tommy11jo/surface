"use client";

import { CircleDot, Search } from "lucide-react";
import { type ChangeEvent, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export enum ResponseStatus {
  Loading,
  Ready,
  ErrorRequiresCode,
  ErrorQueryTooLong,
  ErrorQueryEmpty,
  ErrorStreaming,
  ErrorCodeOutOfUses,
}

type AnswerInputProps = {
  query: string;
  setQuery: (value: string) => void;
  secretCode: string;
  streamingError: Error | null;
  isStreaming: boolean;
  responseStatus: ResponseStatus;
  setResponseStatus: (value: ResponseStatus) => void;
  showRetry: boolean;
};

export const responseStatusToJSX = (status: ResponseStatus) => {
  switch (status) {
    case ResponseStatus.Ready:
      return (
        <span className="inline-flex items-center gap-1">
          <CircleDot size={18} fill={"#32CD32"} color={"#32CD32"} />
          Ready
        </span>
      );
    case ResponseStatus.Loading:
      return (
        <span className="inline-flex items-center gap-1">
          <CircleDot size={18} fill={"#FFEF00"} color={"#FFEF00"} />
          Loading
        </span>
      );
    case ResponseStatus.ErrorQueryEmpty:
      return (
        <span className="inline-flex items-center gap-1">
          <CircleDot size={18} fill={"#DC143C"} color={"#DC143C"} />
          Query cannot be empty
        </span>
      );
    case ResponseStatus.ErrorRequiresCode:
      return (
        <span className="inline-flex items-center gap-1">
          <CircleDot size={18} fill={"#DC143C"} color={"#DC143C"} />
          Requires Code
        </span>
      );
    case ResponseStatus.ErrorStreaming:
      return (
        <span className="inline-flex items-center gap-1">
          <CircleDot size={18} fill={"#DC143C"} color={"#DC143C"} />
          Error while streaming (check console)
        </span>
      );
    case ResponseStatus.ErrorCodeOutOfUses:
      return (
        <span className="inline-flex items-center gap-1">
          <CircleDot size={18} fill={"#DC143C"} color={"#DC143C"} />
          Code out of uses
        </span>
      );
    default:
      throw new Error("Invalid response status");
  }
};

export function AnswerInput({
  query,
  setQuery,
  secretCode,
  streamingError,
  isStreaming,
  responseStatus,
  setResponseStatus,
  showRetry,
}: AnswerInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (secretCode === "") setResponseStatus(ResponseStatus.ErrorRequiresCode);
    else setResponseStatus(ResponseStatus.Ready);
  }, [secretCode]);

  const handleClear = () => {
    setQuery("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleAnswer = (retry = false) => {
    if (query.length >= 1000) {
      setResponseStatus(ResponseStatus.ErrorQueryTooLong);
      return;
    } else if (query.length === 0) {
      setResponseStatus(ResponseStatus.ErrorQueryEmpty);
      return;
    }
    const encodedQuery = encodeURIComponent(query);
    const searchParams = new URLSearchParams({
      q: encodedQuery,
      retry: retry.toString(),
    });
    window.location.href = `/answer?${searchParams.toString()}`;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAnswer();
    }
  };

  useEffect(() => {
    if (streamingError !== null) {
      console.error(`Error while streaming: ${streamingError.message}`);
      setResponseStatus(ResponseStatus.ErrorStreaming);
      return;
    }
    if (isStreaming) {
      setResponseStatus(ResponseStatus.Loading);
    }
  }, [streamingError, isStreaming]);

  return (
    <div className="relative flex w-full flex-col items-start">
      {showRetry && (
        <button
          onClick={() => handleAnswer(true)}
          className="mx-2 inline-flex text-sm font-semibold text-gray-600 hover:underline"
        >
          ↻ Retry
        </button>
      )}
      <div className="relative m-0 flex w-full">
        <div className="relative flex grow sm:grow-0">
          <span className="absolute left-2 top-2 text-gray-500">
            <Search />
          </span>
          <TextareaAutosize
            value={query}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            ref={textareaRef}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full resize-none overflow-y-auto rounded-lg border border-gray-500 p-2 pl-10 pr-7 text-base focus:outline-none focus:ring-1 focus:ring-gray-400 sm:w-[30rem]"
            placeholder="Ask"
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
          onClick={() => handleAnswer()}
          className="ml-2 h-10 flex-shrink-0 whitespace-nowrap rounded bg-sand px-4 font-semibold hover:bg-dark-sand"
        >
          Go →
        </button>
      </div>
      <div className="flex w-full flex-row items-end justify-between">
        <div
          className={`mt-2 text-base text-gray-400 ${responseStatus === ResponseStatus.Loading ? "animate-pulse" : ""}`}
        >
          {responseStatusToJSX(responseStatus)}
        </div>
      </div>
    </div>
  );
}
