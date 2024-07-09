import { type Token } from "../utils/ChatStream";
import { type ClaimMetadata } from "./types";

type AnswerExample = {
  query: string;
  visibleTokens: Token[];
  claimMetadatas: ClaimMetadata[];
};
const chargingExample = {
  query: "can i safely use a macbook charger to charge my iphone",
  visibleTokens: [
    {
      type: 0,
      content:
        "\nThe user wants to know if it's safe to use a MacBook charger to charge their iPhone, likely due to concerns about compatibility or potential damage to the device.\n",
    },
    {
      type: 2,
      content: "\n\nYes",
    },
    {
      type: 2,
      content: ", you",
    },
    {
      type: 2,
      content: " can safely use a",
    },
    {
      type: 2,
      content: " MacBook charger",
    },
    {
      type: 2,
      content: " to charge your",
    },
    {
      type: 2,
      content: " iPhone. Apple",
    },
    {
      type: 2,
      content: " designs",
    },
    {
      type: 2,
      content: " its",
    },
    {
      type: 2,
      content: " products",
    },
    {
      type: 2,
      content: " to be compatible within",
    },
    {
      type: 2,
      content: " their ecosystem, an",
    },
    {
      type: 2,
      content: "d this",
    },
    {
      type: 2,
      content: " includes charging",
    },
    {
      type: 2,
      content: " capabilities",
    },
    {
      type: 2,
      content: ". A MacBook",
    },
    {
      type: 2,
      content: " charger delivers",
    },
    {
      type: 2,
      content: " more",
    },
    {
      type: 2,
      content: " power than",
    },
    {
      type: 2,
      content: " an",
    },
    {
      type: 2,
      content: " iPhone needs",
    },
    {
      type: 2,
      content: ", but",
    },
    {
      type: 2,
      content: " the",
    },
    {
      type: 2,
      content: " iPhone's",
    },
    {
      type: 2,
      content: " built-in power",
    },
    {
      type: 2,
      content: " management",
    },
    {
      type: 2,
      content: " system will only",
    },
    {
      type: 2,
      content: " draw",
    },
    {
      type: 2,
      content: " the",
    },
    {
      type: 2,
      content: " appropriate",
    },
    {
      type: 2,
      content: " amount of power require",
    },
    {
      type: 2,
      content: "d for",
    },
    {
      type: 2,
      content: " charging",
    },
    {
      type: 2,
      content: ".",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "MacBook chargers are compatible with iPhones and will not damage the device.",
      searchQuery: "Can MacBook charger be used for iPhone",
    },
    {
      type: 2,
      content: "\n\nHowever",
    },
    {
      type: 2,
      content: ", it's important",
    },
    {
      type: 2,
      content: " to note that while",
    },
    {
      type: 2,
      content: " it",
    },
    {
      type: 2,
      content: "'s safe,",
    },
    {
      type: 2,
      content: " it",
    },
    {
      type: 2,
      content: " may",
    },
    {
      type: 2,
      content: " not be the most",
    },
    {
      type: 2,
      content: " efficient metho",
    },
    {
      type: 2,
      content: "d.",
    },
    {
      type: 2,
      content: " The",
    },
    {
      type: 2,
      content: " Mac",
    },
    {
      type: 2,
      content: "Book charger is",
    },
    {
      type: 2,
      content: " larger",
    },
    {
      type: 2,
      content: " and more",
    },
    {
      type: 2,
      content: " powerful",
    },
    {
      type: 2,
      content: " than necessary",
    },
    {
      type: 2,
      content: " for",
    },
    {
      type: 2,
      content: " an",
    },
    {
      type: 2,
      content: " iPhone,",
    },
    {
      type: 2,
      content: " so it's",
    },
    {
      type: 2,
      content: " not",
    },
    {
      type: 2,
      content: " as",
    },
    {
      type: 2,
      content: " convenient",
    },
    {
      type: 2,
      content: " for everyday",
    },
    {
      type: 2,
      content: " use",
    },
    {
      type: 2,
      content: " or",
    },
    {
      type: 2,
      content: " travel",
    },
    {
      type: 2,
      content: ". Additionally, charging",
    },
    {
      type: 2,
      content: " speeds",
    },
    {
      type: 2,
      content: " may not",
    },
    {
      type: 2,
      content: " be faster",
    },
    {
      type: 2,
      content: " than",
    },
    {
      type: 2,
      content: " using",
    },
    {
      type: 2,
      content: " the standar",
    },
    {
      type: 2,
      content: "d iPhone charger.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            "\"While it may sound strange, it's safe to use Apple's higher-powered USB-C chargers, as your iPhone or iPad is what determines the power it receives, not the charger. Apple even does testing with the whole range of its USB-C power adapters.\"",
          url: "https://9to5mac.com/2024/02/08/fast-charge-iphone-macbook-charger/",
          hostname: "9to5mac.com",
          title: "Can you fast charge iPhone with MacBook charger? - 9to5Mac",
        },
        {
          content:
            '"Apple says the following iOS devices are compatible with its 18W, 20W, 29W, 30W, 61W, 87W, 96W, and 140W adapters for fast charging: iPhone 8/8 Plus and later"',
          url: "https://9to5mac.com/2024/02/08/fast-charge-iphone-macbook-charger/",
          hostname: "9to5mac.com",
          title: "Can you fast charge iPhone with MacBook charger? - 9to5Mac",
        },
      ],
      category: 1,
      content:
        "MacBook chargers are compatible with iPhones and will not damage the device.",
      isComplete: true,
    },
  ],
};
const teaExample = {
  query: "typical amount of caffeine in a cup of tea",
  visibleTokens: [
    {
      type: 0,
      content:
        "\nThe user likely wants to know the average caffeine content in a standard cup of tea, possibly to compare it with other caffeinated beverages or understand its effects.\n",
    },
    {
      type: 2,
      content: "\n\nA typical",
    },
    {
      type: 2,
      content: " cup",
    },
    {
      type: 2,
      content: " of tea contains about",
    },
    {
      type: 2,
      content: " 14",
    },
    {
      type: 2,
      content: "-",
    },
    {
      type: 2,
      content: "70",
    },
    {
      type: 2,
      content: " mg of caff",
    },
    {
      type: 2,
      content: "eine, depending on",
    },
    {
      type: 2,
      content: " the type of",
    },
    {
      type: 2,
      content: " tea and brewing",
    },
    {
      type: 2,
      content: " method. Black",
    },
    {
      type: 2,
      content: " tea generally",
    },
    {
      type: 2,
      content: " has",
    },
    {
      type: 2,
      content: " the highest caff",
    },
    {
      type: 2,
      content: "eine content, while",
    },
    {
      type: 2,
      content: " herbal t",
    },
    {
      type: 2,
      content: "eas usually",
    },
    {
      type: 2,
      content: " contain",
    },
    {
      type: 2,
      content: " no",
    },
    {
      type: 2,
      content: " caffeine at",
    },
    {
      type: 2,
      content: " all.",
    },
    {
      type: 2,
      content: " Green",
    },
    {
      type: 2,
      content: " an",
    },
    {
      type: 2,
      content: "d white teas fall",
    },
    {
      type: 2,
      content: " somewhere",
    },
    {
      type: 2,
      content: " in between.",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "An average 8-ounce (240 ml) cup of black tea contains 47 mg of caffeine.",
      searchQuery: "average caffeine content in black tea",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "Green tea typically contains 25-35 mg of caffeine per 8-ounce cup.",
      searchQuery: "caffeine content in green tea",
    },
    {
      type: 2,
      content: "\n\nThe",
    },
    {
      type: 2,
      content: " caff",
    },
    {
      type: 2,
      content: "eine content in tea",
    },
    {
      type: 2,
      content: " is",
    },
    {
      type: 2,
      content: " generally lower than that",
    },
    {
      type: 2,
      content: " of",
    },
    {
      type: 2,
      content: " coffee, which",
    },
    {
      type: 2,
      content: " can",
    },
    {
      type: 2,
      content: " range from 95",
    },
    {
      type: 2,
      content: "-200 mg",
    },
    {
      type: 2,
      content: " per ",
    },
    {
      type: 2,
      content: "8-oun",
    },
    {
      type: 2,
      content: "ce cup.",
    },
    {
      type: 2,
      content: " Factors",
    },
    {
      type: 2,
      content: " such",
    },
    {
      type: 2,
      content: " as ste",
    },
    {
      type: 2,
      content: "eping time, water",
    },
    {
      type: 2,
      content: " temperature, and the",
    },
    {
      type: 2,
      content: " specific tea blen",
    },
    {
      type: 2,
      content: "d can",
    },
    {
      type: 2,
      content: " all",
    },
    {
      type: 2,
      content: " affect",
    },
    {
      type: 2,
      content: " the final",
    },
    {
      type: 2,
      content: " caffeine content",
    },
    {
      type: 2,
      content: " in",
    },
    {
      type: 2,
      content: " your",
    },
    {
      type: 2,
      content: " cup",
    },
    {
      type: 2,
      content: ".",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"Generally speaking, the average cup of brewed black tea contains around 47 mg of caffeine per 8 oz (240 ml) cup (1, 2)."',
          url: "https://www.nutritionadvance.com/how-much-caffeine-is-in-cup-of-black-tea/",
          hostname: "www.nutritionadvance.com",
          title:
            "How Much Caffeine Is In a Cup of Black Tea? - Nutrition Advance",
        },
      ],
      category: 0,
      content:
        "An average 8-ounce (240 ml) cup of black tea contains 47 mg of caffeine.",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"An 8-ounce (230-ml) cup of green tea contains between 30 and 50 milligrams of caffeine."',
          url: "https://www.healthline.com/nutrition/caffeine-in-green-tea",
          hostname: "www.healthline.com",
          title: "How Much Caffeine Is in Green Tea? - Healthline",
        },
      ],
      category: 1,
      content:
        "Green tea typically contains 25-35 mg of caffeine per 8-ounce cup.",
      isComplete: true,
    },
  ],
};
const chatEnergyExample = {
  query: "energy per query for gpt-4",
  visibleTokens: [
    {
      type: 0,
      content:
        "\nThe user likely wants to know the amount of energy consumed for a single query or interaction with the GPT-4 language model.\n",
    },
    {
      type: 2,
      content: "\n\nThe",
    },
    {
      type: 2,
      content: " exact",
    },
    {
      type: 2,
      content: " energy",
    },
    {
      type: 2,
      content: " consumption per",
    },
    {
      type: 2,
      content: " query for",
    },
    {
      type: 2,
      content: " GPT-4",
    },
    {
      type: 2,
      content: " is not publicly",
    },
    {
      type: 2,
      content: " disclose",
    },
    {
      type: 2,
      content: "d by Open",
    },
    {
      type: 2,
      content: "AI.",
    },
    {
      type: 2,
      content: " However, large",
    },
    {
      type: 2,
      content: " language models like GP",
    },
    {
      type: 2,
      content: "T-4 ",
    },
    {
      type: 2,
      content: "are",
    },
    {
      type: 2,
      content: " known",
    },
    {
      type: 2,
      content: " to be",
    },
    {
      type: 2,
      content: " comput",
    },
    {
      type: 2,
      content: "ationally intensive",
    },
    {
      type: 2,
      content: " and consume",
    },
    {
      type: 2,
      content: " significant amounts of energy",
    },
    {
      type: 2,
      content: ".",
    },
    {
      type: 2,
      content: " The",
    },
    {
      type: 2,
      content: " energy",
    },
    {
      type: 2,
      content: " usage can vary depending",
    },
    {
      type: 2,
      content: " on factors",
    },
    {
      type: 2,
      content: " such",
    },
    {
      type: 2,
      content: " as the length",
    },
    {
      type: 2,
      content: " an",
    },
    {
      type: 2,
      content: "d complexity of the query",
    },
    {
      type: 2,
      content: ",",
    },
    {
      type: 2,
      content: " the hardware",
    },
    {
      type: 2,
      content: " use",
    },
    {
      type: 2,
      content: "d, and the specific",
    },
    {
      type: 2,
      content: " implementation.",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "GPT-4 consumes more energy per query than its predecessor, GPT-3.",
      searchQuery: "GPT-4 energy consumption compared to GPT-3",
    },
    {
      type: 2,
      content: "\n\nWhile",
    },
    {
      type: 2,
      content: " precise",
    },
    {
      type: 2,
      content: " figures",
    },
    {
      type: 2,
      content: " are not available",
    },
    {
      type: 2,
      content: ", it",
    },
    {
      type: 2,
      content: "'s estimate",
    },
    {
      type: 2,
      content: "d that a",
    },
    {
      type: 2,
      content: " single query",
    },
    {
      type: 2,
      content: " to",
    },
    {
      type: 2,
      content: " a",
    },
    {
      type: 2,
      content: " large",
    },
    {
      type: 2,
      content: " language model like GP",
    },
    {
      type: 2,
      content: "T-4 ",
    },
    {
      type: 2,
      content: "coul",
    },
    {
      type: 2,
      content: "d consume",
    },
    {
      type: 2,
      content: " energy",
    },
    {
      type: 2,
      content: " equivalent",
    },
    {
      type: 2,
      content: " to charging",
    },
    {
      type: 2,
      content: " a smartphone.",
    },
    {
      type: 2,
      content: " However",
    },
    {
      type: 2,
      content: ", it",
    },
    {
      type: 2,
      content: "'s important",
    },
    {
      type: 2,
      content: " to note that these",
    },
    {
      type: 2,
      content: " estimates can",
    },
    {
      type: 2,
      content: " vary widely an",
    },
    {
      type: 2,
      content: "d shoul",
    },
    {
      type: 2,
      content: "d be",
    },
    {
      type: 2,
      content: " taken as rough",
    },
    {
      type: 2,
      content: " approxim",
    },
    {
      type: 2,
      content: "ations rather",
    },
    {
      type: 2,
      content: " than definitive measurements",
    },
    {
      type: 2,
      content: ".\n\n",
    },
    {
      type: 1,
      content:
        "The energy consumption of AI models like GPT-4 has raised concerns about their environmental impact.",
      searchQuery: "AI models energy consumption environmental impact",
    },
    {
      type: 2,
      content: "\n\nResearchers",
    },
    {
      type: 2,
      content: " and companies",
    },
    {
      type: 2,
      content: " are",
    },
    {
      type: 2,
      content: " working on",
    },
    {
      type: 2,
      content: " developing more energy-",
    },
    {
      type: 2,
      content: "efficient AI models",
    },
    {
      type: 2,
      content: " an",
    },
    {
      type: 2,
      content: "d improving",
    },
    {
      type: 2,
      content: " the",
    },
    {
      type: 2,
      content: " infrastructure",
    },
    {
      type: 2,
      content: " supporting",
    },
    {
      type: 2,
      content: " these",
    },
    {
      type: 2,
      content: " systems",
    },
    {
      type: 2,
      content: " to",
    },
    {
      type: 2,
      content: " reduce their overall",
    },
    {
      type: 2,
      content: " energy footprint.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"When we train a model like ChatGPT, we run complex computations on vast amounts of data, typically using powerful GPUs or TPUs. This process can take weeks or even months and consume substantial electricity."',
          url: "https://www.baeldung.com/cs/chatgpt-large-language-models-power-consumption",
          hostname: "www.baeldung.com",
          title: "Energy Consumption of ChatGPT Responses - Baeldung",
        },
        {
          content:
            '"Each query ChatGPT process involves running the model\'s neural network to generate a coherent and contextually relevant response. It is estimated that when we generate a single response using GPT-3, we consume around 0.0003 kWh (kilowatt-hours) of energy. In comparison, the same response using GPT-4 can consume around 0.0005 kWh (kilowatt-hours) of energy."',
          url: "https://www.baeldung.com/cs/chatgpt-large-language-models-power-consumption",
          hostname: "www.baeldung.com",
          title: "Energy Consumption of ChatGPT Responses - Baeldung",
        },
      ],
      category: 1,
      content:
        "GPT-4 consumes more energy per query than its predecessor, GPT-3.",
      isComplete: true,
    },
    {
      snippets: [
        {
          content:
            '"It\'s estimated that a search driven by generative AI uses four to five times the energy of a conventional web search. Within years, large AI systems are likely to need as much energy as entire nations."',
          url: "https://www.nature.com/articles/d41586-024-00478-x",
          hostname: "www.nature.com",
          title:
            "Generative AI’s environmental costs are soaring — and mostly secret",
        },
        {
          content:
            '"Generative AI systems need enormous amounts of fresh water to cool their processors and generate electricity. In West Des Moines, Iowa, a giant data-centre cluster serves OpenAI\'s most advanced model, GPT-4."',
          url: "https://www.nature.com/articles/d41586-024-00478-x",
          hostname: "www.nature.com",
          title:
            "Generative AI’s environmental costs are soaring — and mostly secret",
        },
      ],
      category: 0,
      content:
        "The energy consumption of AI models like GPT-4 has raised concerns about their environmental impact.",
      isComplete: true,
    },
  ],
};

const friesExample = {
  query: "best oil to make oven fries",
  visibleTokens: [
    {
      type: 0,
      content:
        "\nThe user likely wants to know which type of oil is most suitable for making crispy, flavorful oven fries with optimal results.\n",
    },
    {
      type: 2,
      content: "\n\nFor",
    },
    {
      type: 2,
      content: " making",
    },
    {
      type: 2,
      content: " ",
    },
    {
      type: 2,
      content: "oven fries,",
    },
    {
      type: 2,
      content: " the best oil to",
    },
    {
      type: 2,
      content: " use is one",
    },
    {
      type: 2,
      content: " with",
    },
    {
      type: 2,
      content: " a high smoke",
    },
    {
      type: 2,
      content: " point and neutral",
    },
    {
      type: 2,
      content: " flavor.",
    },
    {
      type: 2,
      content: " Av",
    },
    {
      type: 2,
      content: "ocado oil is",
    },
    {
      type: 2,
      content: " an excellent choice due",
    },
    {
      type: 2,
      content: " to its high smoke",
    },
    {
      type: 2,
      content: " point (aroun",
    },
    {
      type: 2,
      content: "d 520",
    },
    {
      type: 2,
      content: "°F/",
    },
    {
      type: 2,
      content: "271",
    },
    {
      type: 2,
      content: "°C) an",
    },
    {
      type: 2,
      content: "d mil",
    },
    {
      type: 2,
      content: "d taste",
    },
    {
      type: 2,
      content: ". Other",
    },
    {
      type: 2,
      content: " good options include light",
    },
    {
      type: 2,
      content: " olive oil, veget",
    },
    {
      type: 2,
      content: "able oil, or",
    },
    {
      type: 2,
      content: " can",
    },
    {
      type: 2,
      content: "ola oil.",
    },
    {
      type: 2,
      content: "\n\n",
    },
    {
      type: 1,
      content:
        "Avocado oil has a smoke point of around 520°F (271°C), making it ideal for high-temperature cooking.",
      searchQuery: "avocado oil smoke point",
    },
    {
      type: 2,
      content: "\n\nThese",
    },
    {
      type: 2,
      content: " oils",
    },
    {
      type: 2,
      content: " can with",
    },
    {
      type: 2,
      content: "stand the",
    },
    {
      type: 2,
      content: " high temperatures",
    },
    {
      type: 2,
      content: " require",
    },
    {
      type: 2,
      content: "d for",
    },
    {
      type: 2,
      content: " cri",
    },
    {
      type: 2,
      content: "spy ",
    },
    {
      type: 2,
      content: "oven fries without",
    },
    {
      type: 2,
      content: " burning or im",
    },
    {
      type: 2,
      content: "parting unw",
    },
    {
      type: 2,
      content: "anted flavors.",
    },
    {
      type: 2,
      content: " They",
    },
    {
      type: 2,
      content: " also help",
    },
    {
      type: 2,
      content: " achieve",
    },
    {
      type: 2,
      content: " a",
    },
    {
      type: 2,
      content: " golden-",
    },
    {
      type: 2,
      content: "brown exterior while",
    },
    {
      type: 2,
      content: " keeping",
    },
    {
      type: 2,
      content: " the inside soft an",
    },
    {
      type: 2,
      content: "d fluffy.",
    },
    {
      type: 2,
      content: " When",
    },
    {
      type: 2,
      content: " using",
    },
    {
      type: 2,
      content: " any",
    },
    {
      type: 2,
      content: " of",
    },
    {
      type: 2,
      content: " these oils, t",
    },
    {
      type: 2,
      content: "oss your",
    },
    {
      type: 2,
      content: " cut",
    },
    {
      type: 2,
      content: " pot",
    },
    {
      type: 2,
      content: "atoes in a light",
    },
    {
      type: 2,
      content: " coating before",
    },
    {
      type: 2,
      content: " b",
    },
    {
      type: 2,
      content: "aking for",
    },
    {
      type: 2,
      content: " best",
    },
    {
      type: 2,
      content: " results.",
    },
  ],
  claimMetadatas: [
    {
      snippets: [
        {
          content:
            '"Refined avocado oil has a smoke point of 520 F (271 C), making it the most heat-stable option for high-temperature frying."',
          url: "https://superfoodprofiles.com/avocado-oil-cooking-smoke-point-oils",
          hostname: "superfoodprofiles.com",
          title: "Avocado Oil For Frying & The Smoke Points Of Cooking Oils",
        },
        {
          content:
            '"Cold pressed avocado oil has a smoke point of 480 F (248 C). This is still much higher than any of the more popular processed vegetable oils on the market."',
          url: "https://superfoodprofiles.com/avocado-oil-cooking-smoke-point-oils",
          hostname: "superfoodprofiles.com",
          title: "Avocado Oil For Frying & The Smoke Points Of Cooking Oils",
        },
      ],
      category: 1,
      content:
        "Avocado oil has a smoke point of around 520°F (271°C), making it ideal for high-temperature cooking.",
      isComplete: true,
    },
  ],
};

export const answerExamplesList: AnswerExample[] = [
  chargingExample,
  teaExample,
  chatEnergyExample,
  friesExample,
];
