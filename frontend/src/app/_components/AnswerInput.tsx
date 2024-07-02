"use client";

import { useEffect, useState } from "react";

type AnswerInputProps = {
  query: string;
  setQuery: (value: string) => void;
  showRefresh: boolean;
  secretCode: string;
  secretLoading: boolean;
  streamingError: Error | null;
  isStreaming: boolean;
};
export const LOADING_STATE = "🟡 Loading";
export const IDLE_STATE = "🟢 Ask anything";

export function AnswerInput({
  query,
  setQuery,
  showRefresh,
  secretCode,
  secretLoading,
  streamingError,
  isStreaming,
}: AnswerInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [statusText, setStatusText] = useState(IDLE_STATE);

  useEffect(() => {
    if (inputRef) inputRef.focus();
  }, [inputRef]);

  const handleAnswer = (hardRefresh = false) => {
    if (query.length >= 200) {
      setStatusText("🔴 Query must be <200 chars.");
      return;
    } else if (query.length === 0) {
      setStatusText("🔴 Query cannot be empty");
      return;
    }
    const encodedQuery = encodeURIComponent(query);
    window.location.href = `/answer?q=${encodedQuery}&refresh=${hardRefresh}`;
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleAnswer();
    }
  };

  useEffect(() => {
    if (streamingError !== null) {
      setStatusText(`🔴 Error: ${streamingError.message}`);
      return;
    }
    if (isStreaming) {
      setStatusText(LOADING_STATE);
    } else {
      setStatusText(IDLE_STATE);
    }
  }, [streamingError, isStreaming]);

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
          placeholder={secretCode || secretLoading ? "Ask" : "⛔ Requires code"}
        />
        <button
          onClick={() => handleAnswer()}
          className="mx-2 flex flex-shrink-0 rounded bg-sand p-2 font-semibold hover:bg-dark-sand"
        >
          Go →
        </button>
      </div>
      <div className="flex w-full flex-row items-end justify-between">
        <div className="mt-2 text-base text-gray-400">{statusText}</div>
        {showRefresh && (
          <button
            onClick={() => handleAnswer(true)}
            className="mx-2 inline-flex text-sm font-semibold text-gray-600 hover:underline"
          >
            Refresh ↻
          </button>
        )}
      </div>
    </div>
  );
}
