import axios from "axios"
import { generateLLMResponse } from "./llmService"
import SerpApi from "google-search-results-nodejs"
import {
  getRerankPrompt,
  extractRanksFromResponse,
  orderByScores,
} from "./rerankService"
import { SourceMetadata } from "./types"
import { searchByDDGS } from "./summaryService"
import { convert } from "html-to-text"
const serpApi = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY)

const NUM_SOURCES_TO_PROCESS = 4

export const generateRankedSourceMetadatas = async (
  query: string,
  useSerpApi: boolean = false,
  rerank: boolean = false,
  log: boolean = true
): Promise<SourceMetadata[]> => {
  if (query.length >= 200) throw new Error("Query must be <200 chars.")

  const searchStartTime = Date.now()
  const sourceMetadatas = useSerpApi
    ? await searchBySerpApi(query)
    : await searchByDDGS(query)
  const searchEndTime = Date.now()
  if (log) {
    const ddgsTime = searchEndTime - searchStartTime
    console.log(`Search time: ${ddgsTime / 1000}s`)
  }
  let updatedSourceMetadatas: SourceMetadata[]
  if (rerank) {
    const rerankPrompt = getRerankPrompt(sourceMetadatas, query)
    const rerankStartTime = Date.now()
    const rerankResponse = await generateLLMResponse(rerankPrompt)
    const rerankScores = await extractRanksFromResponse(rerankResponse)
    const rerankIndices = orderByScores(rerankScores)
    const rerankedSourceMetadatas = rerankIndices.map(
      (index) => sourceMetadatas[index]
    )
    const rerankEndTime = Date.now()
    if (log) {
      const rerankTime = rerankEndTime - rerankStartTime
      console.log(`Rerank time: ${rerankTime / 1000}s`)
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
    console.log(`Text fetch time: ${textFetchTime / 1000}s`)
  }

  textContents.forEach(
    (textContent, i) => (updatedSourceMetadatas[i].textContent = textContent)
  )
  return updatedSourceMetadatas
}

export const searchBySerpApi = async (
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

    if (log) {
      console.log(sourceMetadatas)
    }

    return sourceMetadatas
  } catch (error) {
    console.error("Error fetching search results:", error)
    throw error
  }
}

const MAX_WORDS_PER_SOURCE = 1600
// const MAX_WORDS_PER_SOURCE = 3000
const GOOGLE_CACHE_ERROR_STR = "Error 404 (Not Found)!!1"
export const getTextContent = async (
  url: string,
  trim: boolean,
  approxWordsCutoff: number = MAX_WORDS_PER_SOURCE,
  jinaTimeout: number = 5000
): Promise<string | undefined> => {
  // r.jina.ai does not work on reddit
  // use google's cache for reddit, though this is deprecated
  if (url.includes("reddit.com")) {
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
    // Remove markdown links, keeping the visible text
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
