"use client";
import React from "react";
import { type Token, TokenType } from "../utils/ChatStream";

interface AnswerDisplayProps {
  visibleTokens: Token[];
}

export function AnswerDisplay({ visibleTokens }: AnswerDisplayProps) {
  const renderTokens = (tokens: Token[]) => {
    return tokens.map((token, index) => {
      switch (token.type) {
        case TokenType.Claim:
          return (
            <span className="italic" key={index}>
              {token.content}
            </span>
          );
        case TokenType.Thinking:
          return null;
        case TokenType.Text:
          return <span key={index}>{token.content}</span>;
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="flex w-full border-b border-solid border-dark-sand"></div>
      <div className="flex grow flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col items-center sm:w-1/2">
          <div className="flex w-full flex-col py-2">
            <div className="flex w-full justify-center py-2 underline">
              Answer
            </div>
            <div className="flex w-full px-2">
              <p className="whitespace-pre-wrap">
                {renderTokens(visibleTokens)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col border-l border-none border-dark-sand sm:w-1/2 sm:border-solid">
          <div className="flex w-full justify-center py-2 underline">
            Citations
          </div>
        </div>
      </div>
    </div>
  );
}
