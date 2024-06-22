import axios from "axios"
import { generateLLMResponse } from "./llmService"
import SerpApi from "google-search-results-nodejs"
import {
  getRerankPrompt,
  extractRanksFromResponse,
  orderByScores,
} from "./rerankService"
import { SourceMetadata } from "./types"
import {
  getWebpageSummaryPrompt,
  extractSummaryFromResponse,
  searchByDDGS,
} from "./summaryService"
const serpApi = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY)

const NUM_SOURCES_TO_PROCESS = 3

export const generateSourceMetadatasService = async (
  query: string,
  log: boolean = true
) => {
  if (query.length >= 200) throw new Error("Query must be <200 chars.")
  const startTime = Date.now()

  const ddgsStartTime = Date.now()
  const sourceMetadatas = await searchByDDGS(query)
  // const sourceMetadatas = await searchBySerpApi(query)
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
  const ddgsEndTime = Date.now()
  if (log) {
    const ddgsTime = ddgsEndTime - ddgsStartTime
    console.log(`Search time: ${ddgsTime / 1000}s`)
  }

  const textFetchStartTime = Date.now()
  const textContents: (string | undefined)[] = await Promise.all(
    rerankedSourceMetadatas.map((result, i) =>
      i < NUM_SOURCES_TO_PROCESS ? getTextContent(result.url, true) : undefined
    )
  )
  const textFetchEndTime = Date.now()
  if (log) {
    const textFetchTime = textFetchEndTime - textFetchStartTime
    console.log(`Text fetch time: ${textFetchTime / 1000}s`)
  }
  textContents.forEach(
    (textContent, i) => (rerankedSourceMetadatas[i].textContent = textContent)
  )
  const sourceMetadatasWithText = rerankedSourceMetadatas.filter(
    (metadata) => metadata.textContent
  )

  const overviewPrompts = sourceMetadatasWithText.map((metadata) =>
    getWebpageSummaryPrompt(metadata.textContent!, metadata.hostname)
  )

  const summaryStartTime = Date.now()
  const llmSummaryResponses = await Promise.all(
    overviewPrompts.map((prompt) => generateLLMResponse(prompt))
  )
  const summaryEndTime = Date.now()
  if (log) {
    const summaryTime = summaryEndTime - summaryStartTime
    console.log(`Summary time: ${summaryTime / 1000}s`)
  }

  const sourceSummaries = llmSummaryResponses
    .map((response) =>
      response !== null ? extractSummaryFromResponse(response) : null
    )
    .filter((summary) => summary !== null) as string[]

  // do not assume a valid summary
  // sources like youtube videos might not have summaries or the LLM might not generate the summary correctly
  const sourceMetadatasWithOverview: SourceMetadata[] = []
  sourceSummaries.forEach((overview, index) => {
    if (overview !== null) {
      sourceMetadatasWithText[index].summary = overview
      sourceMetadatasWithOverview.push({
        ...sourceMetadatasWithText[index],
        summary: overview,
      })
    }
  })

  const sourceMetadatasWithoutOverviews = rerankedSourceMetadatas.filter(
    (metadata) => !metadata.summary
  )
  const updatedMetadatas = [
    ...sourceMetadatasWithOverview,
    ...sourceMetadatasWithoutOverviews,
  ].map(({ textContent, ...rest }) => rest)

  const endTime = Date.now()
  const totalTime = endTime - startTime
  console.log(`Total time: ${totalTime / 1000}s`)
  return updatedMetadatas
}

export const searchBySerpApi = async (
  query: string,
  count: number = 20,
  log: boolean = true
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

export const getTextContent = async (
  url: string,
  trim: boolean
): Promise<string | undefined> => {
  // r.jina.ai does not work on reddit
  // use google's cache for reddit, though this is deprecated
  if (url.includes("reddit.com")) {
    const result = await fetch(
      `http://webcache.googleusercontent.com/search?q=cache:${url}`
    )
    console.log(result)
  }
  try {
    const approxWordsCutoff = 3000
    const response = await axios.get(`https://r.jina.ai/${url}`, {
      responseType: "text",
      timeout: 5000,
    })

    let data = response.data
    // Remove markdown links, keeping the visible text
    data = data.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    data = data.replace(/!\[.*?\]\(.*?\)/g, "")

    if (trim && data.length > approxWordsCutoff * 6) {
      const firstPart = data.slice(0, 9000)
      const lastPart = data.slice(-9000)
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
