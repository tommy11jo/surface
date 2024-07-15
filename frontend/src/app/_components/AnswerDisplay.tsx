"use client";
import React from "react";
import { type Token, TokenType } from "../utils/ChatStream";
import { ClaimCategory, type ClaimMetadata } from "./types";
import { Info } from "lucide-react";
interface AnswerDisplayProps {
  visibleTokens: Token[];
  claimMetadatas: (ClaimMetadata | null)[];
}

const categoryWithEmoji = (category: ClaimCategory): string => {
  switch (category) {
    case ClaimCategory.EvalSupported:
      return "supported";
    case ClaimCategory.EvalDoubted:
      return "doubted";
    case ClaimCategory.EvalUncertain:
      return "not verified";
    default:
      throw new Error("Unknown claim category.");
  }
};

const getCategoryStyle = (category: ClaimCategory): string => {
  switch (category) {
    case ClaimCategory.EvalSupported:
      return "bg-gray-200 underline decoration-dashed decoration-gray-500";
    case ClaimCategory.EvalUncertain:
      return "underline decoration-yellow-400 decoration-wavy underline-offset-4";
    case ClaimCategory.EvalDoubted:
      return "underline decoration-red-300 decoration-wavy underline-offset-4";
    default:
      console.error("category is", category);
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
                <div
                  className={`mx-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-300`}
                >
                  <span className="text-sm">{claimIndex++}</span>
                </div>
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
      if (metadata === null)
        return <React.Fragment key={`empty-${mIndex}`}></React.Fragment>;
      return (
        <div key={`citation-${mIndex}`}>
          <div className="font-semibold">
            →{" "}
            <span>
              Claim{" "}
              <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-300">
                <span className="text-sm">{mIndex}</span>
              </div>{" "}
              is{" "}
            </span>
            <span className={`${getCategoryStyle(metadata.category)}`}>
              {categoryWithEmoji(metadata.category)}
            </span>
          </div>
          <div className="pl-2 sm:pl-4">
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
                    <span className="inline-flex gap-2">
                      ️
                      <Info size={16} />
                      {snippet.hostname}
                    </span>
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
