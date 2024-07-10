import { type Token } from "../utils/ChatStream";
import { type ClaimMetadata } from "./types";

type AnswerExample = {
  query: string;
  visibleTokens: Token[];
  claimMetadatas: ClaimMetadata[];
};

const webScrapeExample = {
  query: "court cases related to web scraping",
  visibleTokens: [
    {
      type: 2,
      content:
        "Web scraping, the practice of automatically extracting data from websites, has been the subject of several notable court cases. Here's an overview of some key legal issues and cases related to web scraping:\n\n",
    },
    {
      type: 1,
      content:
        "The legality of web scraping often depends on the specific circumstances, including the data being scraped and how it's used",
      searchQuery: "web scraping legality court cases",
    },
    {
      type: 2,
      content:
        "\n\nOne of the most significant cases is hiQ Labs v. LinkedIn. In this case, hiQ Labs was scraping publicly available data from LinkedIn profiles. LinkedIn attempted to stop this practice, but the Ninth Circuit Court of Appeals ruled that scraping publicly accessible data likely does not violate the Computer Fraud and Abuse Act (CFAA).\n\nAnother important case is Facebook v. Power Ventures, where the court ruled that continuing to access Facebook's servers after receiving a cease-and-desist letter violated the CFAA. This highlights the importance of respecting a website's terms of service and any direct communications from the site owner.\n\n",
    },
    {
      type: 1,
      content:
        "Violating a website's terms of service or ignoring cease-and-desist notices can potentially make web scraping illegal",
      searchQuery: "web scraping terms of service violation court cases",
    },
    {
      type: 2,
      content:
        "\n\nOther relevant cases include:\n\n1. eBay v. Bidder's Edge: eBay successfully argued that Bidder's Edge's scraping activities constituted trespass to chattels.\n\n2. Craigslist v. 3Taps: The court ruled that continuing to scrape after receiving a cease-and-desist letter and IP address blocks violated the CFAA.\n\n3. Associated Press v. Meltwater: This case dealt with copyright issues related to scraping news content.\n\nThese cases demonstrate that while web scraping itself isn't inherently illegal, it can become problematic depending on how it's conducted and what data is being collected. Factors such as respecting robots.txt files, not overloading servers, and adhering to terms of service are important considerations for those engaging in web scraping activities.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"The Ninth Circuit reaffirmed its original decision and found that scraping data that is publicly accessible on the internet is not a violation of the Computer Fraud and Abuse Act, or CFAA, which governs what constitutes computer hacking under U.S. law."',
          url: "https://techcrunch.com/2022/04/18/web-scraping-legal-court/",
          hostname: "techcrunch.com",
          title:
            "Web scraping is legal, US appeals court reaffirms | TechCrunch",
        },
        {
          content:
            '"Scraping public data is legal, the U.S. Ninth Circuit of Appeals has ruled in a potentially landmark decision. The decision follows a ruling by a federal court of appeals that reaffirmed its earlier decision, notably that web scraping (data harvesting, en masse) of data that\'s made available to the general public, does not violate the Computer Fraud and Abuse Act (CFAA)."',
          url: "https://www.techradar.com/news/us-court-says-web-scraping-is-officially-legal",
          hostname: "www.techradar.com",
          title: "US court says web scraping is officially legal | TechRadar",
        },
      ],
      category: 0,
      content:
        "The legality of web scraping often depends on the specific circumstances, including the data being scraped and how it's used",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            "\"The Ninth Circuit determined that Van Buren supported its previous holding and '[i]t is likely that when a computer network generally permits public access to its data, a user's accessing that publicly available data will not constitute access without authorization under the CFAA.'\"",
          url: "https://www.whitecase.com/insight-our-thinking/web-scraping-website-terms-and-cfaa-hiqs-preliminary-injunction-affirmed-again",
          hostname: "www.whitecase.com",
          title:
            "Web scraping, website terms and the CFAA: hiQ’s ... - White & Case",
        },
        {
          content:
            '"Based on this finding, accessing publicly available website data in violation of terms of service or a cease-and-desist notice is unlikely to constitute a violation of the CFAA. However, the Court emphasized that its analysis was limited in scope to the CFAA and did not apply to potential claims against web scrapers under other theories, including trespass to chattels, copyright infringement, misappropriation, unjust enrichment, conversion, breach of contract or breach of privacy claims."',
          url: "https://www.whitecase.com/insight-our-thinking/web-scraping-website-terms-and-cfaa-hiqs-preliminary-injunction-affirmed-again",
          hostname: "www.whitecase.com",
          title:
            "Web scraping, website terms and the CFAA: hiQ’s ... - White & Case",
        },
      ],
      category: 2,
      content:
        "Violating a website's terms of service or ignoring cease-and-desist notices can potentially make web scraping illegal",
      isComplete: true,
    },
  ],
};
const chatEnergyExample = {
  query: "energy per query for gpt-4",
  visibleTokens: [
    {
      type: 2,
      content:
        "GPT-4 is a large language model developed by OpenAI, known for its advanced capabilities in natural language processing and generation. Regarding the energy consumption per query for GPT-4:\n\n",
    },
    {
      type: 1,
      content:
        "The exact energy consumption per query for GPT-4 is not publicly disclosed by OpenAI",
      searchQuery: "GPT-4 energy consumption per query",
    },
    {
      type: 2,
      content:
        "\n\nWhile the specific energy usage is not known, it's generally understood that large language models like GPT-4 require significant computational resources and energy to operate. The energy consumption can vary depending on factors such as the complexity of the query, the length of the response, and the specific hardware used to run the model.\n\nIt's worth noting that as AI models become more advanced and efficient, there are ongoing efforts in the AI community to develop more energy-efficient algorithms and hardware to reduce the environmental impact of these systems.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"The exact energy consumption per query for GPT-4 is not publicly disclosed by OpenAI. However, it is estimated that when we generate a single response using GPT-3, we consume around 0.0003 kWh (kilowatt-hours) of energy. In comparison, the same response using GPT-4 can consume around 0.0005 kWh (kilowatt-hours) of energy."',
          url: "https://www.baeldung.com/cs/chatgpt-large-language-models-power-consumption",
          hostname: "www.baeldung.com",
          title: "Energy Consumption of ChatGPT Responses - Baeldung",
        },
      ],
      category: 0,
      content:
        "The exact energy consumption per query for GPT-4 is not publicly disclosed by OpenAI",
      isComplete: true,
    },
  ],
};

const acxCommentHomeless = {
  query: `"Actually, a lot of San Francisco's problems date back to a Supreme Court decision that city governments could not limit their public assistance programs to residents of the city. This might have been specifically designed to destroy cities that had generous public assistance programs." 

which case is this person referring to?`,

  visibleTokens: [
    {
      type: 2,
      content:
        "This person is likely referring to a significant Supreme Court decision that impacted how cities could administer their public assistance programs. Let me provide some context:\n\n",
    },
    {
      type: 1,
      content:
        "The case in question is likely Shapiro v. Thompson from 1969, which dealt with residency requirements for welfare benefits",
      searchQuery: "Shapiro v. Thompson 1969 Supreme Court welfare residency",
    },
    {
      type: 2,
      content:
        "\n\nIn this case, the Supreme Court ruled that states and cities could not impose residency requirements on welfare recipients. This decision had far-reaching implications:\n\n1. It meant that cities and states could not limit their public assistance programs only to long-term residents.\n\n2. The ruling was based on the constitutional right to travel between states, which the Court determined was infringed by residency requirements for welfare.\n\n3. This decision potentially made cities with more generous welfare programs more attractive to people in need of assistance from other areas.\n\n",
    },
    {
      type: 1,
      content:
        "The ruling led to concerns that cities with better social services would become overwhelmed by an influx of people seeking benefits",
      searchQuery: "impact of Shapiro v. Thompson on urban welfare systems",
    },
    {
      type: 2,
      content:
        "\n\nWhile the decision was intended to protect individual rights, some argue that it had unintended consequences for urban areas, potentially contributing to increased strain on social services in cities like San Francisco.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"Shapiro v. Thompson, 394 U.S. 618 (1969), was a landmark decision of the Supreme Court of the United States that invalidated state durational residency requirements for public assistance and helped establish a fundamental "right to travel" in U.S. law."',
          url: "https://en.wikipedia.org/wiki/Shapiro_v._Thompson",
          hostname: "en.wikipedia.org",
          title: "Shapiro v. Thompson - Wikipedia",
        },
        {
          content:
            '"The statutory prohibition of benefits to residents of less than a year creates a classification which denies equal protection of the laws because the interests allegedly served by the classification either may not constitutionally be promoted by government or are not compelling governmental interests."',
          url: "https://supreme.justia.com/cases/federal/us/394/618/",
          hostname: "supreme.justia.com",
          title:
            "Shapiro v. Thompson, 394 U.S. 618 (1969) - Justia US Supreme Court Center",
        },
      ],
      category: 0,
      content:
        "The case in question is likely Shapiro v. Thompson from 1969, which dealt with residency requirements for welfare benefits",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"The statutory prohibition of benefits to residents of less than a year creates a classification which denies equal protection of the laws because the interests allegedly served by the classification either may not constitutionally be promoted by government or are not compelling governmental interests."',
          url: "https://legalaidhistory.org/case/shapiro-v-thompson/",
          hostname: "legalaidhistory.org",
          title: "Shapiro v. Thompson (1969) | Legal Aid History",
        },
        {
          content:
            '"The ruling led to concerns that cities with better social services would become overwhelmed by an influx of people seeking benefits. By 1970, there was a 17% increase in those nationally receiving AFDC aid due to Shapiro."',
          url: "https://en.wikipedia.org/wiki/Shapiro_v._Thompson",
          hostname: "en.wikipedia.org",
          title: "Shapiro v. Thompson - Wikipedia",
        },
      ],
      category: 0,
      content:
        "The ruling led to concerns that cities with better social services would become overwhelmed by an influx of people seeking benefits",
      isComplete: true,
    },
  ],
};
const redisExample = {
  query: "default save policy redis",
  visibleTokens: [
    {
      type: 2,
      content:
        "Redis is an in-memory data structure store that can be used as a database, cache, message broker, and queue. Here's some key information about Redis's default save policy:\n\n",
    },
    {
      type: 1,
      content:
        "Redis uses a snapshot-based persistence mechanism called RDB (Redis Database) as its default save policy",
      searchQuery:
        "Redis uses a snapshot-based persistence mechanism called RDB (Redis Database) as its default save policy",
    },
    {
      type: 2,
      content:
        "\n\nBy default, Redis will save the dataset to disk based on certain conditions:\n\n1. Time-based: Redis will save if a specified amount of time has elapsed since the last save.\n2. Changes-based: Redis will save if a certain number of write operations have occurred.\n\nThe default configuration typically looks like this:\n\nsave 900 1\nsave 300 10\nsave 60 10000\n\nThis means:\n- Save after 900 seconds (15 minutes) if at least 1 key changed\n- Save after 300 seconds (5 minutes) if at least 10 keys changed\n- Save after 60 seconds if at least 10,000 keys changed\n\n",
    },
    {
      type: 1,
      content:
        "Redis also supports an Append-Only File (AOF) persistence mode, which can be enabled for more frequent and granular saving",
      searchQuery:
        "Redis also supports an Append-Only File (AOF) persistence mode, which can be enabled for more frequent and granular saving",
    },
    {
      type: 2,
      content:
        "\n\nIt's important to note that while these are the default settings, they can be adjusted to suit specific application needs and performance requirements.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"Redis provides a range of persistence options. These include: **RDB** (Redis Database): RDB persistence performs point-in-time snapshots of your dataset at specified intervals."',
          url: "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/",
          hostname: "redis.io",
          title: "Redis persistence | Docs",
        },
        {
          content:
            "\"Redis supports so-called 'snapshots'. This means that it will do a complete copy of whats in memory at some points in time (e.g. every full hour). When you lose power between two snapshots, you will lose the data from the time between the last snapshot and the crash.\"",
          url: "https://stackoverflow.com/questions/25328317/does-redis-persist-data",
          hostname: "stackoverflow.com",
          title: "Does Redis persist data? - Stack Overflow",
        },
      ],
      category: 1,
      content:
        "Redis uses a snapshot-based persistence mechanism called RDB (Redis Database) as its default save policy",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"AOF (Append Only File): AOF persistence logs every write operation received by the server. These operations can then be replayed again at server startup, reconstructing the original dataset. Commands are logged using the same format as the Redis protocol itself."',
          url: "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/",
          hostname: "redis.io",
          title: "Redis persistence | Docs",
        },
        {
          content:
            '"Using AOF Redis is much more durable: you can have different fsync policies: no fsync at all, fsync every second, fsync at every query. With the default policy of fsync every second, write performance is still great."',
          url: "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/",
          hostname: "redis.io",
          title: "Redis persistence | Docs",
        },
      ],
      category: 0,
      content:
        "Redis also supports an Append-Only File (AOF) persistence mode, which can be enabled for more frequent and granular saving",
      isComplete: true,
    },
  ],
};

const nextExample = {
  query: "does nextjs allow me to set the cache control headers",
  visibleTokens: [
    {
      type: 2,
      content:
        "Yes, Next.js allows you to set Cache-Control headers. Here's a brief overview:\n\n",
    },
    {
      type: 1,
      content:
        "Next.js provides built-in support for setting Cache-Control headers on both static and dynamic routes",
      searchQuery: "Next.js Cache-Control headers",
    },
    {
      type: 2,
      content:
        "\n\nFor static routes, you can set Cache-Control headers in the next.config.js file. For dynamic routes, you can set them programmatically in your API routes or getServerSideProps functions.\n\nTo set Cache-Control headers for static routes:\n\n1. Create or open your next.config.js file\n2. Add a headers() function in the module.exports object\n3. Define your caching rules using patterns and header configurations\n\nFor dynamic routes, you can set headers in your API route or getServerSideProps function using the res.setHeader() method.\n\n",
    },
    {
      type: 1,
      content:
        "Setting appropriate Cache-Control headers can significantly improve your Next.js application's performance and reduce server load",
      searchQuery: "benefits of Cache-Control headers in Next.js",
    },
    {
      type: 2,
      content:
        "\n\nRemember to carefully consider your caching strategy based on your specific use case and content update frequency.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            "NextJS with App Router handles the cache-control header automatically. If you attempt to set it in `next.config.js` it will be overwritten in production by the built-in caching mechanism.",
          url: "https://stackoverflow.com/questions/76228269/setting-cache-control-header-in-nextjs-app-router",
          hostname: "stackoverflow.com",
          title:
            "next.js - Setting Cache-Control Header in NextJS App Router - Stack ...",
        },
        {
          content:
            "You cannot set `Cache-Control` headers in `next.config.js` for pages or assets, as these headers will be overwritten in production to ensure that responses and static assets are cached effectively.",
          url: "https://nextjs.org/docs/app/api-reference/next-config-js/headers",
          hostname: "nextjs.org",
          title: "next.config.js Options: headers | Next.js",
        },
      ],
      category: 2,
      content:
        "Next.js provides built-in support for setting Cache-Control headers on both static and dynamic routes",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"Setting appropriate Cache-Control headers can significantly improve your Next.js application\'s performance and reduce server load. By caching the output of costly operations, Next.js enables swift responses to client-side requests while mitigating server strain."',
          url: "https://www.dhiwise.com/post/leveraging-nextjs-cache-everything-you-need-to-know",
          hostname: "www.dhiwise.com",
          title: "The Ultimate Next.js Cache Tutorial for Web Developers",
        },
      ],
      category: 0,
      content:
        "Setting appropriate Cache-Control headers can significantly improve your Next.js application's performance and reduce server load",
      isComplete: true,
    },
  ],
};
const modelSizeExample = {
  query: "openai model sizes over the years",
  visibleTokens: [
    {
      type: 2,
      content: "Here's an overview of OpenAI's model sizes over the years:\n\n",
    },
    {
      type: 1,
      content: "OpenAI's GPT-1, released in 2018, had 117 million parameters",
      searchQuery: "OpenAI GPT-1 parameters",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "GPT-2, introduced in 2019, came in sizes ranging from 124 million to 1.5 billion parameters",
      searchQuery: "OpenAI GPT-2 model sizes",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "GPT-3, unveiled in 2020, dramatically increased in size to 175 billion parameters",
      searchQuery: "GPT-3 175 billion parameters",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "The latest GPT-4 model, released in 2023, is rumored to have over 1 trillion parameters, though the exact size has not been officially disclosed",
      searchQuery: "GPT-4 estimated parameters",
    },
    {
      type: 2,
      content:
        "\n\nThis trend shows a significant increase in model size over time, with each new iteration generally being much larger than its predecessor. However, it's important to note that model size alone doesn't determine performance, as factors like training data quality and algorithmic improvements also play crucial roles.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content: "GPT-1 was initially released in June 2018 by OpenAI.",
          url: "https://en.wikipedia.org/wiki/GPT-1",
          hostname: "en.wikipedia.org",
          title: "GPT-1 - Wikipedia",
        },
        {
          content:
            "The Wikipedia article does not mention the number of parameters in GPT-1.",
          url: "https://en.wikipedia.org/wiki/GPT-1",
          hostname: "en.wikipedia.org",
          title: "GPT-1 - Wikipedia",
        },
      ],
      category: 1,
      content: "OpenAI's GPT-1, released in 2018, had 117 million parameters",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"GPT-2 was created as a "direct scale-up" of GPT-1 with a ten-fold increase in both its parameter count and the size of its training dataset. It is a general-purpose learner and its ability to perform the various tasks was a consequence of its general ability to accurately predict the next item in a sequence"',
          url: "https://en.wikipedia.org/wiki/GPT-2",
          hostname: "en.wikipedia.org",
          title: "GPT-2 - Wikipedia",
        },
        {
          content:
            "\"As the final model release of GPT-2's staged release, we're releasing the largest version (1.5B parameters) of GPT-2 along with code and model weights to facilitate detection of outputs of GPT-2 models.\"",
          url: "https://openai.com/research/gpt-2-1-5b-release/",
          hostname: "openai.com",
          title: "GPT-2: 1.5B release | OpenAI",
        },
      ],
      category: 0,
      content:
        "GPT-2, introduced in 2019, came in sizes ranging from 124 million to 1.5 billion parameters",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"GPT-3 has 175 billion parameters, each with 16-bit precision, requiring 350GB of storage since each parameter occupies 2 bytes. It has a context window size of 2048 tokens, and has demonstrated strong "zero-shot" and "few-shot" learning abilities on many tasks."',
          url: "https://en.wikipedia.org/wiki/GPT-3",
          hostname: "en.wikipedia.org",
          title: "GPT-3 - Wikipedia",
        },
        {
          content:
            '"Generative Pre-trained Transformer 3 (GPT-3) is a large language model released by OpenAI in 2020."',
          url: "https://en.wikipedia.org/wiki/GPT-3",
          hostname: "en.wikipedia.org",
          title: "GPT-3 - Wikipedia",
        },
      ],
      category: 0,
      content:
        "GPT-3, unveiled in 2020, dramatically increased in size to 175 billion parameters",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            "OpenAI has declined to reveal various technical details and statistics about GPT-4, such as the precise size of the model.",
          url: "https://en.wikipedia.org/wiki/GPT-4",
          hostname: "en.wikipedia.org",
          title: "GPT-4 - Wikipedia",
        },
        {
          content:
            "Rumors claim that GPT-4 has 1.76 trillion parameters, which was first estimated by the speed it was running and by George Hotz.",
          url: "https://en.wikipedia.org/wiki/GPT-4",
          hostname: "en.wikipedia.org",
          title: "GPT-4 - Wikipedia",
        },
      ],
      category: 1,
      content:
        "The latest GPT-4 model, released in 2023, is rumored to have over 1 trillion parameters, though the exact size has not been officially disclosed",
      isComplete: true,
    },
  ],
};
export const answerExamplesList: AnswerExample[] = [
  webScrapeExample,
  nextExample,
  redisExample,
  chatEnergyExample,
  modelSizeExample,
  acxCommentHomeless,
];
