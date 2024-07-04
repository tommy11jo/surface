import { useState } from "react";
import { type ClaimMetadata, ClaimCategory } from "../_components/types";
import { type Token } from "./ChatStream";

export const useMockDirectAnswerData = () => {
  const [visibleTokens, setVisibleTokens] = useState<Token[]>([
    {
      type: 0,
      content:
        "\nThe user likely wants to know which type of meat has the highest protein content per serving or weight. They may be interested in maximizing protein intake for dietary or fitness reasons.\n",
    },
    {
      type: 2,
      content: "\n\nLean",
    },
    {
      type: 2,
      content: " meats generally",
    },
    {
      type: 2,
      content: " have the",
    },
    {
      type: 2,
      content: " highest protein content",
    },
    {
      type: 2,
      content: " relative",
    },
    {
      type: 2,
      content: " to their",
    },
    {
      type: 2,
      content: " cal",
    },
    {
      type: 2,
      content: "orie count",
    },
    {
      type: 2,
      content: ".",
    },
    {
      type: 2,
      content: " ",
    },
    {
      type: 1,
      content:
        "Chicken breast is one of the highest protein meats, containing about 31 grams of protein per 100 grams.",
    },
    {
      type: 2,
      content: " Other",
    },
    {
      type: 2,
      content: " high",
    },
    {
      type: 2,
      content: "-protein meats",
    },
    {
      type: 2,
      content: " include turkey",
    },
    {
      type: 2,
      content: " breast, lean",
    },
    {
      type: 2,
      content: " beef, and some",
    },
    {
      type: 2,
      content: " fish",
    },
    {
      type: 2,
      content: " like",
    },
    {
      type: 2,
      content: " t",
    },
    {
      type: 2,
      content: "una. The",
    },
    {
      type: 2,
      content: " exact",
    },
    {
      type: 2,
      content: " protein content can",
    },
    {
      type: 2,
      content: " vary based on cut",
    },
    {
      type: 2,
      content: " an",
    },
    {
      type: 2,
      content: "d preparation",
    },
    {
      type: 2,
      content: " method. It",
    },
    {
      type: 2,
      content: "'s important",
    },
    {
      type: 2,
      content: " to consider",
    },
    {
      type: 2,
      content: " overall",
    },
    {
      type: 2,
      content: " nutrit",
    },
    {
      type: 2,
      content: "ional value",
    },
    {
      type: 2,
      content: ",",
    },
    {
      type: 2,
      content: " not just protein",
    },
    {
      type: 2,
      content: " content",
    },
    {
      type: 2,
      content: ",",
    },
    {
      type: 2,
      content: " when choosing me",
    },
    {
      type: 2,
      content: "ats for a balance",
    },
    {
      type: 2,
      content: "d diet.\n",
    },
    {
      type: 1,
      content:
        "Beef typically has less protein per 100 grams than chicken breast.",
    },
  ]);
  const [claimMetadatas, setClaimMetadatas] = useState<ClaimMetadata[]>([
    {
      content:
        "Chicken breast is one of the highest protein meats, containing about 31 grams of protein per 100 grams.",
      snippets: [
        {
          url: "https://example.com",
          hostname: "https://example.com",
          title: "Example website title",
          content: "Snippet 3 content",
        },
      ],
      category: ClaimCategory.Correct,
      distinctions: [],
    },
    {
      content:
        "Beef typically has less protein per 100 grams than chicken breast.",
      snippets: [
        {
          url: "https://example.com",
          hostname: "https://example.com",
          title: "Example website title",
          content: "Snippet 1 content",
        },
        {
          url: "https://example.com",
          hostname: "https://example.com",
          title: "Example website title",
          content: "Snippet 2 content",
        },
      ],
      category: ClaimCategory.ApproxCorrect,
      distinctions: [],
    },
  ]);
  return { visibleTokens, setVisibleTokens, claimMetadatas, setClaimMetadatas };
};
