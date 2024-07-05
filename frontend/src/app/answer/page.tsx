"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSecretCode } from "../secretContext";
import { AnswerInput, IDLE_STATE } from "../_components/AnswerInput";
import { useSearchParams } from "next/navigation";
import { AnswerDisplay } from "../_components/AnswerDisplay";
import ChatStream, { TokenType, type Token } from "../utils/ChatStream";
import { type ClaimMetadata, ClaimCategory } from "../_components/types";
import { useMockDirectAnswerData } from "../utils/MockDirectAnswerData";
import axios, { AxiosError } from "axios";
const MAX_NUM_CLAIMS = 7;

export default function DirectAnswerPage() {
  const searchParams = useSearchParams();
  const encodedQuery = searchParams.get("q") ?? "";
  const query = decodeURIComponent(encodedQuery);
  const isExample = searchParams.get("isExample") === "true";
  const retry = searchParams.get("retry") === "true";
  const { secretCode } = useSecretCode();

  const [tempQuery, setTempQuery] = useState(query);
  const [visibleTokens, setVisibleTokens] = useState<Token[]>([]);
  const [claimMetadatas, setClaimMetadatas] = useState<
    (ClaimMetadata | null)[]
  >(Array(MAX_NUM_CLAIMS).fill(null));
  const [statusText, setStatusText] = useState(IDLE_STATE);

  // for testing the interface
  // const { visibleTokens, setVisibleTokens, claimMetadatas, setClaimMetadatas } =
  //   useMockDirectAnswerData();

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const chatStreamRef = useRef<ChatStream | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    chatStreamRef.current = new ChatStream(secretCode);
    return () => {
      if (chatStreamRef.current) {
        chatStreamRef.current.stopStream();
      }
    };
  }, [secretCode]);

  const allClaims = useRef<string[]>([]);

  const verifyNewClaims = useCallback(
    async (claims: string[], startIndex: number, response: string) => {
      if (!secretCode) throw new Error("secret must be setup");
      if (claims.length > 3)
        throw new Error("More than 3 claims is not allowed.");
      const newClaims = claims.slice(startIndex);

      const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
      if (apiPrefix === undefined) throw new Error("Api prefix is undefined");
      let errorOccurred = false;
      const verifyEndpoint = `${apiPrefix}/api/verify`;
      const claimDatas = await Promise.all(
        newClaims.map(async (claim) => {
          try {
            const { data } = await axios.post<ClaimMetadata | null>(
              verifyEndpoint,
              {
                claim,
                context: response,
                secret: secretCode,
                retry,
              },
            );
            if (data === null) return null;
            return { ...data, isComplete: true };
          } catch (error: unknown) {
            errorOccurred = true;
            if (error instanceof AxiosError) {
              if (error.response?.status === 429) {
                setStatusText("🔴 Error: code is out of uses");
              } else {
                setStatusText("🔴 Error during verification");
              }
              console.error(error);
            } else {
              console.error("An unexpected error occurred", error);
            }
            return null;
          }
        }),
      );
      if (!errorOccurred) setStatusText("🟢 Verification Complete");
      setClaimMetadatas((metadatas) => {
        const newMetadatas = [...metadatas];
        claimDatas.forEach((data, ind) => {
          newMetadatas[startIndex + ind] = data;
        });
        return newMetadatas;
      });
    },
    [secretCode],
  );

  const updateState = useCallback(() => {
    if (chatStreamRef.current) {
      const state = chatStreamRef.current.getState();
      setVisibleTokens(state.visibleTokens);
      setIsStreaming(state.isStreaming);
      setError(state.error);
      if (!state.isStreaming && !state.error)
        setStatusText("🟢 Initial Answer Complete");

      const claims = state.visibleTokens
        .filter((token) => token.type === TokenType.Claim)
        .map((token) => token.content);

      if (claims.length > allClaims.current.length) {
        verifyNewClaims(claims, allClaims.current.length, state.response);
        allClaims.current = claims;
      }

      if (!state.isStreaming) {
        if (intervalIdRef.current !== null) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      }
    }
  }, [verifyNewClaims]);

  const initiateStream = useCallback(() => {
    if (query === "" || secretCode === "" || !chatStreamRef.current) return;
    try {
      setIsStreaming(true);
      setError(null);
      setVisibleTokens([]);

      chatStreamRef.current.startStream(query, retry);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    } finally {
      intervalIdRef.current = window.setInterval(updateState, 200);
    }
  }, [query, secretCode, updateState]);

  useEffect(() => {
    initiateStream();

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
      if (chatStreamRef.current) {
        chatStreamRef.current.stopStream();
      }
    };
  }, [initiateStream]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-start px-2 py-6 sm:px-12">
      <AnswerInput
        query={tempQuery}
        setQuery={setTempQuery}
        isStreaming={isStreaming}
        streamingError={error}
        secretCode={secretCode}
        statusText={statusText}
        setStatusText={setStatusText}
        showRetry={visibleTokens.length > 0}
      />
      <AnswerDisplay
        visibleTokens={visibleTokens}
        claimMetadatas={claimMetadatas}
      />
    </div>
  );
}
