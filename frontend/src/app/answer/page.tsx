"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSecretCode } from "../secretContext";
import { AnswerInput } from "../_components/AnswerInput";
import { useSearchParams } from "next/navigation";
import { AnswerDisplay } from "../_components/AnswerDisplay";
import ChatStream, { type Token } from "../utils/ChatStream";

export default function DirectAnswerPage() {
  const searchParams = useSearchParams();
  const encodedQuery = searchParams.get("q") ?? "";
  const query = decodeURIComponent(encodedQuery);
  const isExample = searchParams.get("isExample") === "true";
  const hardRefresh = searchParams.get("refresh") === "true";
  const { secretCode, secretLoading } = useSecretCode();

  const [tempQuery, setTempQuery] = useState("");
  const [visibleTokens, setVisibleTokens] = useState<Token[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const chatStreamRef = useRef<ChatStream | null>(null);

  useEffect(() => {
    chatStreamRef.current = new ChatStream(secretCode);
    return () => {
      if (chatStreamRef.current) {
        chatStreamRef.current.stopStream();
      }
    };
  }, [secretCode]);

  const updateState = useCallback(() => {
    if (chatStreamRef.current) {
      const state = chatStreamRef.current.getState();
      setVisibleTokens(state.visibleTokens);
      setIsStreaming(state.isStreaming);
      setError(state.error);
    }
  }, []);

  const initiateStream = useCallback(async () => {
    if (query === "" || secretCode === "" || !chatStreamRef.current) return;
    try {
      setIsStreaming(true);
      setError(null);
      setVisibleTokens([]);

      await chatStreamRef.current.startStream(query);
    } catch (e) {
      console.log("Streaming error:", e);
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    } finally {
      updateState();
    }
  }, [query, secretCode, updateState]);

  useEffect(() => {
    initiateStream();
    // Set up an interval to periodically update the state
    const intervalId = setInterval(updateState, 100); // Update every 100ms
    return () => {
      clearInterval(intervalId);
      if (chatStreamRef.current) {
        chatStreamRef.current.stopStream();
      }
    };
  }, [initiateStream, updateState]);

  const stopStream = useCallback(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.stopStream();
      updateState();
    }
  }, [updateState]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-start px-2 py-6">
      <AnswerInput
        query={tempQuery}
        setQuery={setTempQuery}
        isStreaming={isStreaming}
        streamingError={error}
        showRefresh={false}
        secretCode={secretCode}
        secretLoading={secretLoading}
      />
      <AnswerDisplay visibleTokens={visibleTokens} />
    </div>
  );
}
