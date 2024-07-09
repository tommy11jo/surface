import axios from "axios"
import { generateLLMResponse } from "./llmService"
import SerpApi from "google-search-results-nodejs"
import {
  getRerankPrompt,
  extractScores,
  orderByScores,
  getRerankPromptAlt,
  extractScoresAlt,
  orderByScoresAlt,
} from "./rerankService"
import { SourceMetadata } from "./types"
import { convert } from "html-to-text"
import { search as ddgs, SafeSearchType } from "duck-duck-scrape"

const serpApi = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY)

const NUM_SOURCES_TO_PROCESS = 4

export const generateRankedSourceMetadatas = async (
  query: string,
  rerank: boolean = false,
  log: boolean = true
): Promise<SourceMetadata[]> => {
  if (query.length >= 200) throw new Error("Query must be <200 chars.")

  const searchStartTime = Date.now()
  const sourceMetadatas = await searchByBing(query)
  const searchEndTime = Date.now()
  if (log) {
    const ddgsTime = searchEndTime - searchStartTime
    console.log(`[INFO] Search time: ${ddgsTime / 1000}s`)
  }
  let updatedSourceMetadatas: SourceMetadata[]
  if (rerank) {
    // const rerankPrompt = getRerankPrompt(sourceMetadatas, query)
    const rerankPrompt = getRerankPromptAlt(sourceMetadatas, query)
    const rerankStartTime = Date.now()
    const rerankResponse = await generateLLMResponse(rerankPrompt)
    // const rerankScores = extractScores(rerankResponse)
    const rerankScores = extractScoresAlt(rerankResponse)
    // const rerankIndices = orderByScores(rerankScores)
    const rerankIndices = orderByScoresAlt(rerankScores)
    const rerankedSourceMetadatas = rerankIndices.map(
      (index) => sourceMetadatas[index]
    )
    const rerankEndTime = Date.now()
    if (log) {
      const rerankTime = rerankEndTime - rerankStartTime
      console.log(`[INFO] Rerank time: ${rerankTime / 1000}s`)
    }
    updatedSourceMetadatas = rerankedSourceMetadatas
  } else {
    console.log("[INFO] Reranking is turned off.")
    updatedSourceMetadatas = sourceMetadatas
  }

  const textFetchStartTime = Date.now()
  const textContents: (string | undefined)[] = await Promise.all(
    updatedSourceMetadatas.map((result, i) =>
      i < NUM_SOURCES_TO_PROCESS ? getTextContent(result.url, true) : undefined
    )
  )
  const textFetchEndTime = Date.now()
  if (log) {
    const textFetchTime = textFetchEndTime - textFetchStartTime
    console.log(`[INFO] Text fetch time: ${textFetchTime / 1000}s`)
  }

  textContents.forEach(
    (textContent, i) => (updatedSourceMetadatas[i].textContent = textContent)
  )
  return updatedSourceMetadatas
}

const MAX_WORDS_PER_SOURCE = 2200
// const MAX_WORDS_PER_SOURCE = 3000
const GOOGLE_CACHE_ERROR_STR = "Error 404 (Not Found)!!1"
export const getTextContent = async (
  url: string,
  trim: boolean,
  approxWordsCutoff: number = MAX_WORDS_PER_SOURCE,
  jinaTimeout: number = 5000,
  useCache: boolean = false
): Promise<string | undefined> => {
  // r.jina.ai does not work on reddit
  // use google's cache for reddit, though this is deprecated
  if (useCache) {
    const response = await fetch(
      `http://webcache.googleusercontent.com/search?q=cache:${url}`
    )
    const html = await response.text()
    if (html.includes(GOOGLE_CACHE_ERROR_STR)) return undefined
    return htmlToText(html)
  }

  try {
    const response = await axios.get(`https://r.jina.ai/${url}`, {
      responseType: "text",
      timeout: jinaTimeout,
    })

    let data = response.data
    // Remove markdown links
    data = data.replace(/\[([^\[\]]*)\]\((.*?)\)/gm, "$1")
    // Remove images
    data = data.replace(/!\[([^\[\]]*)\]\((.*?)\)/gm, "")
    data = data.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

    if (trim && data.length > approxWordsCutoff * 6) {
      const firstPart = data.slice(0, approxWordsCutoff * 3)
      const lastPart = data.slice(-approxWordsCutoff * 3)
      return firstPart + "\n\n[CONTENT REMOVED]\n\n" + lastPart
    }

    return data
  } catch (error) {
    console.error(
      `Failed to fetch text content for ${url}\nError:`,
      (error as Error).message
    )
    return undefined
  }
}

function htmlToText(html: string, maxWords: number = MAX_WORDS_PER_SOURCE) {
  const textContent = convert(html, {
    baseElements: { selectors: ["body"] },
    formatters: {
      headingFormatter: function (elem, walk, builder, formatOptions) {
        builder.openBlock({
          leadingLineBreaks: formatOptions.leadingLineBreaks || 1,
        })
        walk(elem.children, builder)
        builder.closeBlock({
          trailingLineBreaks: formatOptions.trailingLineBreaks || 1,
        })
      },
    },
    selectors: [
      {
        selector: "a",
        options: { ignoreHref: true },
      },
      {
        selector: "img",
        format: "skip",
      },
      {
        selector: "svg",
        format: "skip",
      },
      { selector: "h1", format: "headingFormatter" },
      { selector: "h2", format: "headingFormatter" },
      { selector: "h3", format: "headingFormatter" },
      { selector: "h4", format: "headingFormatter" },
      { selector: "h5", format: "headingFormatter" },
      { selector: "h6", format: "headingFormatter" },
    ],
    wordwrap: false,
  })
  const trimmedTextContent = textContent.substring(0, maxWords * 6)
  return trimmedTextContent
}

const searchBySerpApi = async (
  query: string,
  count: number = 20,
  log: boolean = false
): Promise<SourceMetadata[]> => {
  try {
    const response = await new Promise<any>((resolve, reject) => {
      serpApi.json(
        {
          q: query,
          engine: "google",
          location: "United States",
          hl: "en",
          gl: "us",
          num: count,
        },
        (data: any) => {
          resolve(data)
        }
      )
    })

    const sourceMetadatas: SourceMetadata[] = response.organic_results.map(
      (result: any) => ({
        url: result.link,
        title: result.title,
        icon: result.favicon,
        hostname: new URL(result.link).hostname,
        textContent: result.snippet,
      })
    )
    return sourceMetadatas
  } catch (error) {
    console.error("Error fetching search results:", error)
    throw error
  }
}

const searchByDDGS = async (
  query: string,
  count: number = 20,
  log: boolean = true
) => {
  const searchResults = await ddgs(query, {
    safeSearch: SafeSearchType.STRICT,
  })

  const sourceMetadatas: SourceMetadata[] = searchResults.results.map(
    (result) => ({
      url: result.url,
      title: result.title,
      icon: result.icon,
      hostname: result.hostname,
      textContent: undefined,
    })
  )
  return sourceMetadatas.slice(0, count)
}

type BingSearchResult = {
  url: string
  name: string
  displayUrl: string
}

export const searchByBing = async (
  query: string,
  count: number = 20,
  log: boolean = false
): Promise<SourceMetadata[]> => {
  const endpoint = "https://api.bing.microsoft.com/v7.0/search"
  const subscriptionKey = process.env.BING_SEARCH_V7_SUBSCRIPTION_KEY

  if (!subscriptionKey) {
    throw new Error(
      "BING_SEARCH_V7_SUBSCRIPTION_KEY is not set in environment variables"
    )
  }

  try {
    const response = await axios.get(endpoint, {
      params: {
        q: query,
        count: count,
        responseFilter: "Webpages",
        safeSearch: "Strict",
        mkt: "en-US",
        setLang: "en",
      },
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    })

    if (log) {
      console.log(
        "Bing Search API response:",
        JSON.stringify(response.data, null, 2)
      )
    }

    const results: BingSearchResult[] = response.data.webPages.value

    const sourceMetadatas: SourceMetadata[] = results.map((result) => ({
      url: result.url,
      title: result.name,
      hostname: new URL(result.url).hostname,
      icon: `https://www.google.com/s2/favicons?domain=${result.displayUrl}`,
      textContent: undefined,
    }))

    return sourceMetadatas.slice(0, count)
  } catch (error) {
    console.error("Error calling Bing Search API:", error)
    throw error
  }
}
