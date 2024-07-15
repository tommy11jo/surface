import { type Token } from "../utils/ChatStream";
import { type ClaimMetadata } from "./types";

type AnswerExample = {
  query: string;
  visibleTokens: Token[];
  claimMetadatas: ClaimMetadata[];
};

const acxCommentHomelessExample = {
  query: `Which court case is referenced:
"Actually, a lot of San Francisco's problems date back to a Supreme Court decision that city governments could not limit their public assistance programs to residents of the city. This might have been specifically designed to destroy cities that had generous public assistance programs." 
`,

  visibleTokens: [
    {
      type: 0,
      content:
        "This query refers to a Supreme Court case involving residency requirements for welfare benefits. I need to identify the specific case and its implications for San Francisco.",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "The Supreme Court case referenced is Shapiro v. Thompson (1969), which struck down residency requirements for welfare benefits.",
      searchQuery: "Shapiro v. Thompson 1969 welfare residency requirements",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "This decision made it unconstitutional for states or cities to deny welfare benefits to new residents, potentially attracting more people seeking assistance to cities with generous programs.",
      searchQuery: "Impact of Shapiro v. Thompson on urban welfare programs",
    },
    {
      type: 2,
      content:
        "\n\nThe case in question is Shapiro v. Thompson, decided by the Supreme Court in 1969. This landmark decision ruled that states and cities could not impose residency requirements as a condition for receiving welfare benefits. The Court held that such requirements violated the constitutional right to travel and denied equal protection under the law.\n\nWhile the decision was not specifically designed to impact cities like San Francisco, it had significant implications for urban areas with more generous public assistance programs. By preventing cities from limiting benefits to long-term residents, the ruling potentially made these cities more attractive to individuals seeking aid, which could strain local resources and budgets over time.",
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
            '"The majority opinion, held by Judge Smith in favor of the plaintiff (Thompson), declared that residency waiting periods for welfare via Section 17-2d were unconstitutional under the Equal Protection Clause of the Fourteenth Amendment. The opinion stated that it "has a chilling effect on the right to travel"."',
          url: "https://en.wikipedia.org/wiki/Shapiro_v._Thompson",
          hostname: "en.wikipedia.org",
          title: "Shapiro v. Thompson - Wikipedia",
        },
      ],
      category: 0,
      content:
        "The Supreme Court case referenced is Shapiro v. Thompson (1969), which struck down residency requirements for welfare benefits",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"The statutory prohibition of benefits to residents of less than a year creates a classification which denies equal protection of the laws because the interests allegedly served by the classification either may not constitutionally be promoted by government or are not compelling governmental interests."',
          url: "https://supreme.justia.com/cases/federal/us/394/618/",
          hostname: "supreme.justia.com",
          title:
            "Shapiro v. Thompson, 394 U.S. 618 (1969) - Justia US Supreme Court Center",
        },
        {
          content:
            '"Since the Constitution guarantees the right of interstate movement, the purpose of deterring the migration of indigents into a State is impermissible and cannot serve to justify the classification created by the one-year waiting period."',
          url: "https://legalaidhistory.org/case/shapiro-v-thompson/",
          hostname: "legalaidhistory.org",
          title: "Shapiro v. Thompson (1969) | Legal Aid History",
        },
      ],
      category: 0,
      content:
        "This decision made it unconstitutional for states or cities to deny welfare benefits to new residents, potentially attracting more people seeking assistance to cities with generous programs",
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
        "Next.js provides built-in support for setting Cache-Control headers on both static and dynamic routes.",
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
        "Setting appropriate Cache-Control headers can significantly improve your Next.js application's performance and reduce server load.",
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

const wwIIExample = {
  query: "causes of world war II",
  visibleTokens: [
    {
      type: 0,
      content:
        "I'll provide a concise overview of the main causes of World War II, focusing on key events and factors that led to the global conflict.",
    },
    {
      type: 2,
      content:
        "\n\nWorld War II was caused by a complex interplay of political, economic, and ideological factors in the years following World War I. Here are the primary causes:\n\n",
    },
    {
      type: 1,
      content:
        "The harsh terms of the Treaty of Versailles, which ended World War I, created resentment in Germany and set the stage for future conflict.",
      searchQuery: "Treaty of Versailles impact on World War II",
    },
    {
      type: 2,
      content:
        "\n\nThe rise of fascism in Europe, particularly in Germany and Italy, led to aggressive expansionist policies. Economic instability, including the Great Depression, contributed to political extremism and nationalism. \n\n",
    },
    {
      type: 1,
      content:
        "The policy of appeasement by Western powers, which allowed Nazi Germany to expand unchecked, emboldened Hitler and delayed confrontation.",
      searchQuery: "Appeasement policy World War II",
    },
    {
      type: 2,
      content:
        "\n\nThe immediate trigger for the war was Germany's invasion of Poland in September 1939, which prompted Britain and France to declare war on Germany. Japan's imperial ambitions in Asia and the Pacific also played a significant role in expanding the conflict globally.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"By placing the burden of war guilt entirely on Germany, imposing harsh reparations payments and creating an increasingly unstable collection of smaller nations in Europe, the treaty would ultimately fail to resolve the underlying issues that caused war to break out in 1914, and help pave the way for another massive global conflict 20 years later."',
          url: "https://www.history.com/news/treaty-of-versailles-world-war-ii-german-guilt-effects",
          hostname: "www.history.com",
          title:
            "How the Treaty of Versailles and German Guilt Led to World War II",
        },
        {
          content:
            '"Rather than foster long-term peace and stability, the Versailles Treaty\'s main goal of handling Germany instead sparked movements that would lead directly into World War II. The National Socialist Party used widespread anger about Versailles with the economic collapse of the Great Depression to come to power in 1933."',
          url: "https://www.dailyhistory.org/How_did_the_Versailles_Treaty_lead_to_World_War_Two",
          hostname: "www.dailyhistory.org",
          title: "How did the Versailles Treaty lead to World War Two",
        },
      ],
      category: 0,
      content:
        "The harsh terms of the Treaty of Versailles, which ended World War I, created resentment in Germany and set the stage for future conflict",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"Appeasement is a diplomatic strategy. It means making concessions to an aggressive foreign power in order to avoid war. The best known example of appeasement is British foreign policy towards Nazi Germany in the 1930s. In popular memory, appeasement is primarily associated with British Prime Minister Neville Chamberlain (in office, 1937–1940)."',
          url: "https://encyclopedia.ushmm.org/content/en/article/neville-chamberlain",
          hostname: "encyclopedia.ushmm.org",
          title:
            "The British Policy of Appeasement toward Hitler and Nazi Germany",
        },
        {
          content:
            '"As leader of Nazi Germany (1933–1945), Adolf Hitler pursued an aggressive foreign policy. He disregarded international borders and agreements that had been established following World War I. The Nazis wanted to restore Germany to great power status by overturning the Treaty of Versailles."',
          url: "https://encyclopedia.ushmm.org/content/en/article/neville-chamberlain",
          hostname: "encyclopedia.ushmm.org",
          title:
            "The British Policy of Appeasement toward Hitler and Nazi Germany",
        },
      ],
      category: 0,
      content:
        "The policy of appeasement by Western powers, which allowed Nazi Germany to expand unchecked, emboldened Hitler and delayed confrontation",
      isComplete: true,
    },
  ],
};

const starbucksExample = {
  query: "caffeine in tea",
  visibleTokens: [
    {
      type: 0,
      content:
        "I'll provide information on the caffeine content in tea, comparing it to coffee and discussing factors that affect caffeine levels.",
    },
    {
      type: 2,
      content:
        "\n\nTea does contain caffeine, but generally less than coffee. The amount varies depending on the type of tea and brewing method.\n\n",
    },
    {
      type: 1,
      content:
        "An average cup of black tea contains 14-70 mg of caffeine, while green tea typically has 24-40 mg.",
      searchQuery: "average caffeine content in black tea vs green tea",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "Factors affecting caffeine content in tea include tea variety, water temperature, steeping time, and the amount of tea used.",
      searchQuery: "factors affecting caffeine content in tea",
    },
    {
      type: 2,
      content:
        "\n\nFor comparison, an average 8 oz cup of coffee contains about 95 mg of caffeine. Herbal teas, which are not made from the Camellia sinensis plant, are usually caffeine-free unless they contain added caffeine.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"In general, black tea is thought to have more caffeine, ranging from 25 mg to 48 mg in an 8 oz cup. In contrast, the same serving of green tea has between 25 mg and 29 mg of caffeine."',
          url: "https://www.goodrx.com/well-being/diet-nutrition/caffeine-in-green-tea-vs-black-tea",
          hostname: "www.goodrx.com",
          title: "Black Tea vs. Green Tea: Which Has More Caffeine? - GoodRx",
        },
      ],
      category: 0,
      content:
        "An average cup of black tea contains 14-70 mg of caffeine, while green tea typically has 24-40 mg",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"The caffeine levels of teas are often misunderstood and incorrectly listed. For example, many people think that green tea is always lower in caffeine than black tea, and some people think that white tea is naturally low in caffeine. Get the facts about the factors that influence caffeine levels in teas."',
          url: "https://www.thespruceeats.com/factors-influencing-caffeine-levels-in-tea-765275",
          hostname: "www.thespruceeats.com",
          title: "Factors Influencing Caffeine Levels in Tea - The Spruce Eats",
        },
        {
          content:
            '"The amount of caffeine in your cup of tea depends on a few main factors: brewing methods, processing styles, terroir, age of tea leaves and finally the cultivars of the tea plant."',
          url: "https://tecompanytea.com/blogs/tea-atelier/tea-caffeine",
          hostname: "tecompanytea.com",
          title: "Caffeine in Tea: Levels, Factors & Effects – Té Company",
        },
      ],
      category: 0,
      content:
        "Factors affecting caffeine content in tea include tea variety, water temperature, steeping time, and the amount of tea used",
      isComplete: true,
    },
  ],
};
export const answerExamplesList: AnswerExample[] = [
  wwIIExample,
  starbucksExample,
  nextExample,
  acxCommentHomelessExample,
];
