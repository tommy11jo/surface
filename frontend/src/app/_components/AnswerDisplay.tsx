"use client";
import React from "react";
import { type Token, TokenType } from "../utils/ChatStream";
import { ClaimCategory, type ClaimMetadata } from "./types";

interface AnswerDisplayProps {
  visibleTokens: Token[];
  claimMetadatas: (ClaimMetadata | null)[];
}
const numToEmoji = (num: number): string => {
  switch (num) {
    case 0:
      return "0️⃣";
    case 1:
      return "1️⃣";
    case 2:
      return "2️⃣";
    case 3:
      return "3️⃣";
    case 4:
      return "4️⃣";
    default:
      throw new Error("Only handle emoji nums up to 4");
  }
};
const categoryWithEmoji = (category: ClaimCategory): string => {
  switch (category) {
    case ClaimCategory.Correct:
      return "probably correct";
    case ClaimCategory.MaybeCorrect:
      return "maybe correct";
    case ClaimCategory.Incorrect:
      return "incorrect";
    case ClaimCategory.Uncertain:
      return "unverified";
    case ClaimCategory.Undefined:
      return "unknown";
    default:
      throw new Error("Unknown claim category.");
  }
};

const getCategoryStyle = (category: ClaimCategory): string => {
  switch (category) {
    case ClaimCategory.Correct:
      return "bg-gray-200 underline decoration-dashed decoration-gray-500";
    case ClaimCategory.MaybeCorrect:
      return "underline decoration-yellow-400 decoration-wavy underline-offset-4";
    case ClaimCategory.Incorrect:
      return "underline decoration-red-300 decoration-wavy underline-offset-4";
    case ClaimCategory.Uncertain:
      return "underline decoration-wavy decoration-amber-800 underline-offset-4";
    case ClaimCategory.Undefined:
      return "underline decoration-dotted underline-offset-4 decoration-yellow-500";
    default:
      console.error("category is ", category);
      throw new Error("Unknown category type");
  }
};

export function AnswerDisplay({
  visibleTokens,
  claimMetadatas,
}: AnswerDisplayProps) {
  const renderTokens = (tokens: Token[]) => {
    let claimIndex = 0;
    return tokens
      .map((token, index) => {
        switch (token.type) {
          case TokenType.Claim:
            const metadata = claimMetadatas[claimIndex];
            const defaultStyle =
              "decoration-dotted underline decoration-gray-500";
            const statusStyle = !metadata
              ? defaultStyle
              : getCategoryStyle(metadata.category);
            return (
              <span key={`claim-${index}`}>
                <span className={`${statusStyle}`}>{token.content} </span>
                <span className="inline-flex items-center text-sm">
                  {numToEmoji(claimIndex++)}
                </span>
              </span>
            );
          case TokenType.Thinking:
            return null;
          case TokenType.Text:
            const content =
              index === 1 ? token.content.trimStart() : token.content;
            return <span key={`text-${index}`}>{content}</span>;
          default:
            return null;
        }
      })
      .filter((el) => el !== null);
  };
  const renderCitations = (claimMetadatas: (ClaimMetadata | null)[]) => {
    return claimMetadatas.map((metadata, mIndex) => {
      if (metadata === null || metadata.snippets.length === 0)
        return <React.Fragment key={`empty-${mIndex}`}></React.Fragment>;
      return (
        <div key={`citation-${mIndex}`}>
          <div className="font-semibold">
            → <span>Claim {numToEmoji(mIndex)} is </span>
            <span className={`${getCategoryStyle(metadata.category)}`}>
              {categoryWithEmoji(metadata.category)}
            </span>
          </div>
          <div className="pl-2 sm:pl-4">
            <span className="italic">{metadata.content}</span>
            {metadata.snippets.map((snippet, sIndex) => (
              <div
                key={`snippet-${mIndex}-${sIndex}`}
                className="flex w-full flex-col"
              >
                <div className="group inline-flex max-w-full items-baseline overflow-hidden text-sm">
                  <a
                    href={snippet.url}
                    className="inline break-words text-gray-500 group-hover:underline"
                  >
                    <span>ℹ️ {snippet.hostname}</span>
                    <span className="pl-1 text-gray-500 group-hover:underline">
                      • {snippet.title}
                    </span>
                  </a>
                </div>
                <div className="flex flex-row">
                  <span>• {snippet.content}</span>
                </div>
              </div>
            ))}
            <br />
          </div>
        </div>
      );
    });
  };

  const hasNonNullClaimMetadata = (
    claimMetadatas: (ClaimMetadata | null)[],
  ): boolean => {
    return claimMetadatas.some((metadata) => metadata !== null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="flex w-full border-b border-solid border-dark-sand"></div>
      <div className="flex grow flex-col gap-4 sm:flex-row">
        {visibleTokens.length > 0 && (
          <div className="flex w-full flex-col items-center sm:w-1/2">
            <div className="flex w-full flex-col py-2">
              <div className="flex w-full justify-center py-2 font-semibold">
                Answer
              </div>
              <div className="min-h-[200px] whitespace-pre-line text-wrap">
                {renderTokens(visibleTokens)}
              </div>
            </div>
          </div>
        )}
        {hasNonNullClaimMetadata(claimMetadatas) && (
          <div className="flex w-full flex-col border-l border-none border-dark-sand sm:w-1/2 sm:border-solid">
            <div className="flex w-full justify-center py-2 font-semibold">
              Proof
            </div>
            <div className="flex w-full px-2">
              <div className="whitespace-pre-line text-wrap">
                {renderCitations(claimMetadatas)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
