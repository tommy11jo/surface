import { type Theme, type Snippet, type SourceMetadata } from "./types";

export type SearchExample = {
  query: string;
  sourceMetadatas: SourceMetadata[];
  snippets: Snippet[];
  themes: Theme[];
};

export const creatineSources = [
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    title: "Is Creatine Safe? And More Side Effect FAQs",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba62cee6e71b3b5ad3ef22b98f78da1ace.png",
    hostname: "www.healthline.com",
    summary:
      "Creatine is safe, aiding performance, muscle growth, and recovery without causing kidney, liver damage, dehydration, or cramps. Standard doses are tolerated, though high doses may cause mild digestive issues. It offers other health benefits, including better bone, heart, and cognitive health.",
  },
  {
    url: "https://www.health.harvard.edu/exercise-and-fitness/what-is-creatine-potential-benefits-and-risks-of-this-popular-supplement",
    title: "What is creatine? Potential benefits and risks of this ...",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72baaa91f91405c03bbde195ba2fc9fadba1.png",
    hostname: "www.health.harvard.edu",
    summary:
      "Creatine is made from arginine, glycine, and methionine. It improves athletic performance, aids muscle recovery, and counters age-related muscle loss when combined with exercise. The typical dosage is 3 to 5 grams daily; kidney disease patients should consult a doctor. Foods rich in creatine include meats and fish.",
  },
  {
    url: "https://pubmed.ncbi.nlm.nih.gov/15758854/",
    title: "Is the use of oral creatine supplementation safe?",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba666cffcb44e992c44251645507e21d07.png",
    hostname: "pubmed.ncbi.nlm.nih.gov",
    summary:
      "This review examines oral creatine's effects on gastrointestinal, cardiovascular, musculoskeletal, renal, and liver functions. While side effects like cramping and gastrointestinal issues are anecdotal, no strong evidence links creatine to health deterioration. Controlled studies show creatine is a safe, effective ergogenic aid with proper supervision, and the main side effect is increased body mass.",
  },
  {
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5469049/",
    title: "safety and efficacy of creatine supplementation in exercise ...",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72baf8802eb3b0596aa1df261325d98382b2.png",
    hostname: "www.ncbi.nlm.nih.gov",
  },
  {
    url: "https://examine.com/faq/is-creatine-safe-for-your-kidneys-2/",
    title: "Is creatine safe for your kidneys?",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba308d47a49542a1ed287fa675d38d3b56.png",
    hostname: "examine.com",
  },
  {
    url: "https://my.clevelandclinic.org/health/treatments/17674-creatine",
    title: "Creatine: What It Does, Benefits, Supplements & Safety",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba3a1cce07cdee91ec4ac246b7d6aad449.png",
    hostname: "my.clevelandclinic.org",
  },
  {
    url: "https://www.medicalnewstoday.com/articles/263269",
    title: "Creatine: Uses, benefits, and health risks",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba8f2d8529ec36296ba893e84a59d10d68.png",
    hostname: "www.medicalnewstoday.com",
  },
  {
    url: "https://www.mayoclinic.org/drugs-supplements-creatine/art-20347591",
    title: "Creatine",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72bad479960d877406124da36ad50f8e3e59.png",
    hostname: "www.mayoclinic.org",
  },
  {
    url: "https://www.webmd.com/vitamins/ai/ingredientmono-873/creatine",
    title: "CREATINE - Uses, Side Effects, and More",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba0f3ef5970b55baacedc8d64895260b56.png",
    hostname: "www.webmd.com",
  },
  {
    url: "https://www.healthline.com/nutrition/too-much-creatine",
    title: "Can You Take Too Much Creatine? Side Effects and Dosage",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72bab43b2d74d5f04416c08ba0faa7df4091.png",
    hostname: "www.healthline.com",
  },
  {
    url: "https://www.houstonmethodist.org/blog/articles/2024/apr/creatine-how-does-it-work-is-it-safe-when-should-you-take-it/",
    title: "Creatine: How Does It Work, Is It Safe & When Should You ...",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba42f0fefa91d95022c5390cba62ef0e06.png",
    hostname: "www.houstonmethodist.org",
  },
  {
    url: "https://www.usatoday.com/story/life/health-wellness/2023/07/26/is-creatine-bad-for-you-disadvantages-if-you-can-take-it-every-day/70381317007/",
    title: "Is creatine bad for you? The supplement explained",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba471518e94634fdadace49c7c65fa9d21.png",
    hostname: "www.usatoday.com",
  },
  {
    url: "https://www.uhhospitals.org/blog/articles/2023/07/are-creatine-and-liquid-iv-save-for-teen-athletes",
    title: "Are Creatine and Liquid IV Safe for Teen Athletes?",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba41bc35ac833887dc72a97c2bad3c1f46.png",
    hostname: "www.uhhospitals.org",
  },
  {
    url: "https://www.menshealth.com/nutrition/a19515624/creatine-side-effects-what-it-is-what-it-does/",
    title: "Creatine Guide: What It Is, What It Does, and Side Effects",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba4d71a24e168616bfc05e6667b3d903e6.png",
    hostname: "www.menshealth.com",
  },
  {
    url: "https://www.childrenscolorado.org/conditions-and-advice/sports-articles/sports-nutrition/creatine/",
    title: "Creatine for Young Athletes",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72ba0df97c89e70656c135038238c672b215.png",
    hostname: "www.childrenscolorado.org",
  },
  {
    url: "https://www.youtube.com/watch?v=KIY3Hzg7LnE",
    title: "Are There Any Side Effects to Taking Creatine?",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72bae67a8d09036ac559c413ba4946163637.png",
    hostname: "www.youtube.com",
  },
  {
    url: "https://www.quora.com/Is-it-considered-safe-to-use-creatine-monohydrate-as-a-supplement",
    title: "Is it considered safe to use creatine monohydrate ... - Quora",
    icon: "https://serpapi.com/searches/66777b37f636ff91fad6c5dd/images/85f89f6b3223d883f4e9dc71341a72babd30ff6a9f74806e67624c5bb6a28036.png",
    hostname: "www.quora.com",
  },
];

const creatineSnippets = [
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "The majority of research suggests creatine supplementation is safe when taken at the recommended daily dose.",
    title: "Is Creatine Safe? And More Side Effect FAQs",
    themeId: "id-1",
  },
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "The International Society of Sports Nutrition (ISSN) regards creatine as safe and concludes it’s one of the most beneficial sports supplements available.",
    title: "Is Creatine Safe? And More Side Effect FAQs",
    themeId: "id-1",
  },
  {
    url: "https://www.health.harvard.edu/exercise-and-fitness/what-is-creatine-potential-benefits-and-risks-of-this-popular-supplement",
    hostname: "www.health.harvard.edu",
    content:
      "Otherwise, an adult dose of 3 to 5 grams of creatine daily is safe.",
    title: "What is creatine? Potential benefits and risks of this ...",
    themeId: "id-1",
  },
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "Despite its research-backed benefits, some people avoid creatine because they worry about potential side effects. These are thought to include kidney damage, liver damage, kidney stones, weight gain, bloating, dehydration, hair loss, muscle cramps, digestive concerns, rhabdomyolysis.",
    title: "Is Creatine Safe? And More Side Effect FAQs",
    themeId: "id-2",
  },
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "There’s a misconception that creatine is suitable only for adult male athletes. Yet, no research suggests it’s unsuitable in recommended doses for adult females.",
    title: "Is Creatine Safe? And More Side Effect FAQs",
    themeId: "id-2",
  },
];

const creatineThemes = [
  {
    id: "id-1",
    title: "Is Creatine Safe? And More Side Effect FAQs",
    relevanceScore: 9,
  },
  {
    id: "id-2",
    title: "Common Myths and Misconceptions about Creatine",
    relevanceScore: 6,
  },
];

const educationSources = [
  {
    url: "https://www.reddit.com/r/TheMotte/comments/cua2dr/review_the_case_against_education_bryan_caplan/",
    title: "Review: The Case Against Education, Bryan Caplan",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e2911ebc570bbe575d6adf7c2bc51742978.png",
    hostname: "www.reddit.com",
    summary:
      "Caplan argues much of education is socially wasteful and irrelevant to real life, leading to a signaling arms race for jobs. Education helps obtain jobs but with high costs and limited benefits. He suggests reducing education levels and separating signaling from learning to improve efficiency.",
  },
  {
    url: "https://scottaaronson.blog/?p=3678",
    title: "Review of Bryan Caplan's The Case Against Education",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e291ba2e780a5cf948d198d8c8084b3ee12.jpeg",
    hostname: "scottaaronson.blog",
    summary:
      "Scott Aaronson critiques Caplan’s book, arguing education primarily signals preexisting abilities rather than teaching new skills. He acknowledges the benefits of vocational training but fears Caplan’s vision would erode broader educational experiences and intellectual pursuits.",
  },
  {
    url: "https://jakeseliger.com/2018/03/12/the-case-against-education-bryan-caplan/",
    title: "The Case Against Education — Bryan Caplan",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e29dd02dac2c612eac6f727bd3eae8003e9.jpeg",
    hostname: "jakeseliger.com",
    summary:
      "Bryan Caplan contends education primarily signals traits to employers rather than developing skills. Boredom in school allows this signaling. Changing this system seems implausible. Education might also keep options open and elevate cultural elites.",
  },
  {
    url: "https://thezvi.wordpress.com/2018/04/15/the-case-against-education/",
    title: "The Case Against Education | Don't Worry About the Vase",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e296831026bca373c5a420c77e7bf9fbdf6.png",
    hostname: "thezvi.wordpress.com",
    summary:
      "The article critiques the education system, likening it to a prison that signals compliance rather than imparting useful knowledge. Emphasized through quotes and personal anecdotes, it argues that valuable learning occurs outside formal education.",
  },
  {
    url: "https://medium.com/@Reisen_0/a-review-of-the-case-against-education-bacc120cb8cd",
    title: "A Review of “The Case Against Education” | by Nick HK",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e299858cbaf5e822c14c8377d6d4f3cbe3f.png",
    hostname: "medium.com",
  },
  {
    url: "https://blogs.lse.ac.uk/lsereviewofbooks/2018/05/30/book-review-the-case-against-education-why-the-education-system-is-a-waste-of-time-and-money-by-bryan-caplan/",
    title: "Book Review: The Case Against Education: Why ...",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e294f1dc4d1f4f3544da49737a9b0d20ccb.png",
    hostname: "blogs.lse.ac.uk",
  },
  {
    url: "https://inquisitivebiologist.com/2018/08/30/book-review-the-case-against-education-why-the-education-system-is-a-waste-of-time-and-money/",
    title: "Book review – The Case Against Education: Why ...",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e29d322c30ae9f8fe81546eed97f347b19f.png",
    hostname: "inquisitivebiologist.com",
  },
  {
    url: "https://postlibertarian.com/2018/05/23/book-review-the-case-against-education/",
    title: "Book Review: The Case Against Education",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e2906f93b47048cddbdf60d30efe7c64ba6.png",
    hostname: "postlibertarian.com",
  },
  {
    url: "https://www.hepi.ac.uk/2019/09/06/review-by-danny-dorling-of-the-case-against-education-why-the-education-system-is-a-waste-of-time-and-money-by-professor-bryan-caplan-of-george-mason-university/",
    title: "Review by Danny Dorling of 'The Case Against Education - HEPI",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e29287a527f6c9205740db48d5e02971405.png",
    hostname: "www.hepi.ac.uk",
  },
  {
    url: "https://www.amazon.com/Case-against-Education-System-Waste/dp/0691174652",
    title: "The Case against Education: Why the Education System Is ...",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e29d9ce7ea28fed52114c406c7ab74c95d4.png",
    hostname: "www.amazon.com",
  },
  {
    url: "http://www.anotherpanacea.com/2018/10/a-mini-review-of-bryan-caplans-the-case-against-education/",
    title: "A mini-review of Bryan Caplan's The Case Against Education",
    hostname: "www.anotherpanacea.com",
  },
  {
    url: "http://www.theartolater.com/2018/07/review-case-against-education-why.html",
    title: "Review: The Case Against Education - The Artolater",
    hostname: "www.theartolater.com",
  },
  {
    url: "https://www.goodreads.com/book/show/36319077-the-case-against-education",
    title: "The Case Against Education: Why the Education System Is ...",
    icon: "https://serpapi.com/searches/6677778e2bc7d8c09ce37b77/images/e2ef3e3e8c6206e6ad76a28505df4e29352fef89d4dc7d49383ead1302145aec.png",
    hostname: "www.goodreads.com",
  },
];
const educationSnippets = [
  {
    url: "https://scottaaronson.blog/?p=3678",
    hostname: "scottaaronson.blog",
    content:
      "Caplan—an economist at George Mason University, home of perhaps the most notoriously libertarian economics department on the planet—holds that most of the benefit of education to students (he estimates around 80%, but certainly more than half) is about signalling the students’ preexisting abilities, rather than teaching or improving the students in any way.",
    title: "Review of Bryan Caplan's The Case Against Education",
    themeId: "id-1",
  },
  {
    url: "https://www.reddit.com/r/TheMotte/comments/cua2dr/review_the_case_against_education_bryan_caplan/",
    hostname: "www.reddit.com",
    content:
      "It marshals an impressive amount and quality of evidence that enormous amounts of the education system are socially wasteful and we’d be better off without them.",
    title: "Review: The Case Against Education, Bryan Caplan",
    themeId: "id-1",
  },
  {
    url: "https://www.reddit.com/r/TheMotte/comments/cua2dr/review_the_case_against_education_bryan_caplan/",
    hostname: "www.reddit.com",
    content:
      "Most of what we’re taught in school is useless. Most of what we’re taught we forget, and plenty of us never learn enough of most subjects to really forget them. What we do learn and remember is not just mostly useless, we are almost totally incapable of generalizing from it.",
    title: "Review: The Case Against Education, Bryan Caplan",
    themeId: "id-2",
  },
  {
    url: "https://scottaaronson.blog/?p=3678",
    hostname: "scottaaronson.blog",
    content:
      "In his book, Caplan presents dozens of tables and graphs, but he also repeatedly asks his readers to consult their own memories—exploiting the fact that we all have firsthand experience of school.",
    title: "Review of Bryan Caplan's The Case Against Education",
    themeId: "id-2",
  },
];

const educationThemes = [
  {
    id: "id-1",
    title: 'The Central Argument of "The Case Against Education"',
    relevanceScore: 8,
  },
  {
    id: "id-2",
    title: "The Inefficacy of Current Educational Practices",
    relevanceScore: 5,
  },
];

const startupSources = [
  {
    url: "https://paulgraham.com/startupideas.html",
    title: "How to Get Startup Ideas",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e5611714279299b31a34daa5949a8eee95baf035b.png",
    hostname: "paulgraham.com",
    summary:
      "Startup ideas emerge from real problems, not brainstorming sessions. Founders should solve issues they face personally. Ideal concepts combine personal desire, buildable solutions, and overlooked value. Avoid plausible-sounding but unnecessary ideas. Target small, passionate user groups initially. Expand from a deep, narrow base rather than broad, shallow appeal. Live in the future, build interesting things, and stay attuned to gaps and anomalies in daily life.",
  },
  {
    url: "https://www.ycombinator.com/library/8g-how-to-get-startup-ideas",
    title: "How to get startup ideas",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e56117142ee3d7a4c6da9b1ae49b37a414fc411a9.png",
    hostname: "www.ycombinator.com",
    summary:
      "Startup ideas don't require brilliance, but thoughtful evaluation. Start with problems, not solutions. Evaluate ideas on market size, founder fit, urgency, and difficulty. Generate ideas by leveraging expertise, addressing personal needs, following passions cautiously, exploiting recent changes, adapting successful models, crowdsourcing, or tackling broken industries. Best approach: focus on unfair advantages from unique experiences or skills.",
  },
  {
    url: "https://www.youtube.com/watch?v=Th8JoIan4dg",
    title: "How to Get and Evaluate Startup Ideas | Startup School",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e561171428a3ea4108599fb5f2dc3ed24a954a1a1.png",
    hostname: "www.youtube.com",
    summary:
      "Video teaches startup idea generation and evaluation. Part of educational series for founders. Offers advice, stories, and program insights to help build successful companies.",
  },
  {
    url: "https://www.lesswrong.com/posts/55jLckKpmjSfXKjPp/how-to-get-startup-ideas-a-brief-lit-review-and-analysis",
    title: "How To Get Startup Ideas: A Brief Lit Review and Analysis",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e561171422d07ee5c17126c163a385df0e148b909.png",
    hostname: "www.lesswrong.com",
  },
  {
    url: "https://review.firstround.com/12-frameworks-for-finding-startup-ideas-advice-for-future-founders/",
    title: "12 Frameworks for Finding Startup Ideas — Advice for Future ...",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e56117142973725767b2f2d14027dd57437de4663.png",
    hostname: "review.firstround.com",
  },
  {
    url: "https://www.antler.co/academy/how-to-get-startup-ideas",
    title: "10 Proven Frameworks For Generating Startup Ideas",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e561171422274548659317e230ef8bcd3c0c7d883.png",
    hostname: "www.antler.co",
  },
  {
    url: "https://www.failory.com/blog/how-to-get-startup-ideas",
    title: "How to Get Startup Ideas: 10 Actionable Frameworks in 2024",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e56117142d34d02f902161154f257ff590ae912dc.png",
    hostname: "www.failory.com",
  },
  {
    url: "https://www.reddit.com/r/SaaS/comments/1asdjly/this_is_how_i_find_my_startup_ideas_how_do_you/",
    title: "This is how I find my startup ideas. How do you find yours?",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e56117142289767f830d1be8e26e807bb470321f6.png",
    hostname: "www.reddit.com",
  },
  {
    url: "https://www.leangap.org/articles/how-to-come-up-with-startup-ideas",
    title: "How to Come Up With Brilliant Startup Ideas",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e56117142594950a4d64fd5a2ecc4800e75cab274.png",
    hostname: "www.leangap.org",
  },
  {
    url: "https://www.openvc.app/blog/startup-ideas",
    title: "How to get startup ideas",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e5611714299701b9dbbbd8bf75d33ffd4527e0c5a.png",
    hostname: "www.openvc.app",
  },
  {
    url: "https://spiff.com/blog/startup-ideas-how-the-best-founders-get-them-and-why-novelty-is-overrated/",
    title: "Startup Ideas: How the Best Founders Get Them & ...",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e561171422ed2254414cb0158334f2af601d0178c.png",
    hostname: "spiff.com",
  },
  {
    url: "https://www.quora.com/What-is-the-best-way-to-come-up-with-ideas-for-a-start-up",
    title: "What is the best way to come up with ideas for a start up?",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e561171420e52abe1c9f605a7f32d8ed1e309dcd6.png",
    hostname: "www.quora.com",
  },
  {
    url: "https://www.startupdecisions.com.sg/startups/planning/how-to-generate-startup-ideas",
    title: "How to Generate Business Startup Ideas - StartupDecisions",
    icon: "https://serpapi.com/searches/6677827b224db13c280ccb12/images/d80ce91c7256bfa0aae9469e56117142af116768e4647550ec3943cdb6d317ca.png",
    hostname: "www.startupdecisions.com.sg",
  },
];

const startupSnippets = [
  {
    url: "https://paulgraham.com/startupideas.html",
    hostname: "paulgraham.com",
    content:
      "The way to get startup ideas is not to try to think of startup ideas. It's to look for problems, preferably problems you have yourself.",
    title: "How to Get Startup Ideas",
    themeId: "id-1",
  },
  {
    url: "https://www.ycombinator.com/library/8g-how-to-get-startup-ideas",
    hostname: "www.ycombinator.com",
    content:
      "The third mistake is to start with a solution instead of a problem. And I'll give an example. So, imagine you come up with a startup idea \"Uber for plumbers.\" It's an app, you push a button, a plumber shows up. This is a solution. What problem does this solve? I don't know. Maybe it's hard to find plumbers. That might be a real problem, but my point is if you come up with an idea like this, you are starting with a solution.",
    title: "How to get startup ideas",
    themeId: "id-1",
  },
  {
    url: "https://paulgraham.com/startupideas.html",
    hostname: "paulgraham.com",
    content:
      "The very best startup ideas tend to have three things in common: they're something the founders themselves want, that they themselves can build, and that few others realize are worth doing. Microsoft, Apple, Yahoo, Google, and Facebook all began this way.",
    title: "How to Get Startup Ideas",
    themeId: "id-2",
  },
  {
    url: "https://www.ycombinator.com/library/8g-how-to-get-startup-ideas",
    hostname: "www.ycombinator.com",
    content:
      "You start with what your team is especially good at, and think of ideas that you would have an unfair advantage in executing. The reason this is so effective is that any idea you come up with this way has automatic founder/market fit. You're basically generating all the ideas that have good founder/market fit.",
    title: "How to get startup ideas",
    themeId: "id-2",
  },
];

const startupThemes = [
  {
    id: "id-1",
    title: "Focus on Problems, Not Solutions",
    relevanceScore: 9,
  },
  {
    id: "id-2",
    title: "Leverage Your Expertise and Experiences",
    relevanceScore: 9,
  },
];

const ovenFriesSources = [
  {
    url: "https://blog.thermoworks.com/sides/homemade-french-fries-choosing-the-best-oil/",
    title: "Homemade French Fries: Choosing the Best Oil",
    icon: "https://serpapi.com/searches/6678e62fb5961e98e22c0824/images/6f82e3fb95727b6c92969674c46f10f0ba6071850c6420d5978135a3f7b26f97.png",
    hostname: "blog.thermoworks.com",
    summary:
      "Article compares peanut oil and beef tallow for frying french fries. Peanut oil has high smoke point and neutral flavor. Tallow imparts beefy taste but can foam dangerously. Kitchen tests evaluated thermal properties and flavor. Peanut oil recommended for safety despite tallow producing tastier fries. Proper oil selection balances heat tolerance, flavor, and safety for optimal results.",
  },
  {
    url: "https://www.quora.com/What-type-of-oil-gives-French-fries-the-best-crispy-texture",
    title: "What type of oil gives French fries the best crispy texture?",
    icon: "https://serpapi.com/searches/6678e62fb5961e98e22c0824/images/6f82e3fb95727b6c92969674c46f10f03734e125ea13b1f65e979e2a200ef83b.png",
    hostname: "www.quora.com",
    summary:
      "Oil type matters less than technique for crispy fries. High smoke point oils work well. Key steps: dry potatoes, double fry at different temps, salt after. Some prefer lard. Remove moisture and nail temperatures for best results. Proper method trumps specific oil choice.",
  },
  {
    url: "https://www.quora.com/What-is-your-favorite-oil-for-cooking-French-or-oven-fried-potatoes-peanut-oil-beef-tallow-vegetable-shortening-bacon-grease-or-ghee-butter",
    title: "What is your favorite oil for cooking French or oven fried ...",
    icon: "https://serpapi.com/searches/6678e62fb5961e98e22c0824/images/6f82e3fb95727b6c92969674c46f10f0bf203296f916b2098f19e48389b16111.png",
    hostname: "www.quora.com",
    summary:
      "Cooking oils for fried potatoes vary. Olive oil versatile and healthy. Duck fat adds flavor. Butter-coconut combo works for oven fries. Avocado oil good for high heat. Choices depend on taste, health, and cooking method.",
  },
  {
    url: "https://www.foodrepublic.com/1526574/which-oil-to-make-fries/",
    title: "Which Oil Should You Use To Make French Fries?",
    icon: "https://serpapi.com/searches/6678e62fb5961e98e22c0824/images/6f82e3fb95727b6c92969674c46f10f0f3ce2d06203785604f256052ccc63966.png",
    hostname: "www.foodrepublic.com",
  },
  {
    url: "https://www.reddit.com/r/Cooking/comments/nnp4hw/any_tips_on_oven_baked_fries_i_can_never_seem_to/",
    title: "Any tips on oven baked fries? I can never seem to get them ...",
    icon: "https://serpapi.com/searches/6678e62fb5961e98e22c0824/images/6f82e3fb95727b6c92969674c46f10f00ff6a65b25d08103bcec79af67548c22.png",
    hostname: "www.reddit.com",
  },
  {
    url: "https://www.reddit.com/r/foodhacks/comments/xvma4g/whats_your_best_oven_fries_hack_for_crispy/",
    title: "What's your best oven fries hack for crispy outside and soft ...",
    icon: "https://serpapi.com/searches/6678e62fb5961e98e22c0824/images/6f82e3fb95727b6c92969674c46f10f0780987d59c7928e631a45613147b4b9a.png",
    hostname: "www.reddit.com",
  },
];

const ovenFriesSnippets = [
  {
    url: "https://blog.thermoworks.com/sides/homemade-french-fries-choosing-the-best-oil/",
    hostname: "blog.thermoworks.com",
    content:
      "We need an oil that can handle the high heat of deep frying and that will give us good tasting fries. We need to consider smoke point and flavor profile.",
    title: "Homemade French Fries: Choosing the Best Oil",
    themeId: "id-1",
  },
  {
    url: "https://www.quora.com/What-type-of-oil-gives-French-fries-the-best-crispy-texture",
    hostname: "www.quora.com",
    content:
      "For achieving the best crispy texture when making French fries, many chefs and cooks prefer to use oils with a high smoke point. Oils with high smoke points are more stable at high temperatures and are less likely to break down and impart off-flavors to the fries.",
    title: "What is your favorite oil for cooking French or oven fried ...",
    themeId: "id-1",
  },
];
const ovenFriesThemes = [
  {
    id: "id-1",
    title: "High Smoke Point Oils",
    relevanceScore: 9,
  },
];

const keyboardSources = [
  {
    url: "https://www.rtings.com/keyboard/reviews/best/ergonomic",
    title: "The 4 Best Ergonomic Keyboards - Summer 2024",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d5444725cd63efb646a775e8f84f3ec1d22ce75.png",
    hostname: "www.rtings.com",
    summary:
      "Ergonomic keyboards ease wrist pain from extended typing. The Logitech ERGO K860 tops with its comfortable wrist rest and wave-like shape. The budget-friendly Logitech Wave Keys offers compact comfort. For gaming, the ZSA Moonlander provides customization, while the MoErgo Glove80 suits enthusiasts needing wireless and ergonomic flexibility.",
  },
  {
    url: "https://www.engadget.com/best-ergonomic-keyboard-130047982.html",
    title: "The best ergonomic keyboards for 2024",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d544472bf4665b340915413659066f0b2c1602e.png",
    hostname: "www.engadget.com",
    summary:
      "The article reviews ergonomic keyboards like Logitech Ergo K860, ZSA Voyager, and Kinesis Gaming Freestyle Edge. It explains layouts—Alice, split—features like tenting, negative tilt, programmable keys, and evaluates user suitability for typing, programming, and gaming.",
  },
  {
    url: "https://www.nytimes.com/wirecutter/reviews/comfortable-ergo-keyboard/",
    title: "The 3 Best Ergonomic Keyboard of 2024",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d544472a0511408e1f0678c4b7eda0144bf12b8.png",
    hostname: "www.nytimes.com",
  },
  {
    url: "https://www.pcmag.com/picks/the-best-ergonomic-keyboards",
    title: "The Best Ergonomic Keyboards for 2024",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d544472ac856cdda424edc5df067458f6abbd72.png",
    hostname: "www.pcmag.com",
  },
  {
    url: "https://apnews.com/buyline-shopping/article/best-ergonomic-keyboards",
    title: "Best ergonomic keyboards: How to choose the ...",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d5444726b77e4704aa876cd99e9c38135e64545.png",
    hostname: "apnews.com",
  },
  {
    url: "https://www.cnn.com/cnn-underscored/reviews/best-ergonomic-keyboards",
    title: "Best ergonomic keyboards of 2024 - CNN",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d54447289d01b137d2e6b345330e3dc20a27b74.png",
    hostname: "www.cnn.com",
  },
  {
    url: "https://www.popularmechanics.com/technology/gadgets/g39357700/best-ergonomic-keyboards/",
    title: "The 8 Best Ergonomic Keyboards of 2023",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d54447281e0229d4ad1906e5d24a17f6ad86b67.png",
    hostname: "www.popularmechanics.com",
  },
  {
    url: "https://wstyler.ucsd.edu/posts/ergo_keyboards.html",
    title: "Ergonomic Keyboard Mega-Review",
    hostname: "wstyler.ucsd.edu",
  },
  {
    url: "https://www.nbcnews.com/select/shopping/best-ergonomic-keyboards-ncna1235563",
    title: "4 best ergonomic keyboard",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d544472ebef078234c59614b4b988c1329ff8ea.png",
    hostname: "www.nbcnews.com",
  },
  {
    url: "https://www.reddit.com/r/ErgoMechKeyboards/comments/1akj7fs/first_ergonomic_keyboard_advise/",
    title: "First ergonomic keyboard advise? : r/ErgoMechKeyboards",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d5444722686f428f77e69876b1a6b6b7088263c.png",
    hostname: "www.reddit.com",
  },
  {
    url: "https://www.youtube.com/watch?v=vBRJIvWxajA",
    title: "5 Best Ergonomic Keyboards by an Ergonomist",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d54447296e1af09dd41f0af78b84a0c303db29d.png",
    hostname: "www.youtube.com",
  },
  {
    url: "https://community.keyboard.io/t/first-ergonomic-keyboard-help-choosing-one/1927",
    title: "First ergonomic keyboard - help choosing one",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d54447289de8ade2f5ac66c3d20ce51d4bbec24.png",
    hostname: "community.keyboard.io",
  },
  {
    url: "https://candrews.integralblue.com/2023/09/looking-at-some-of-the-most-popular-ergonomic-mechanical-keyboards-and-selecting-one-spoiler-alert-i-picked-the-dactyl-manuform-with-trackball/",
    title: "I Picked The Dactyl Manuform with Trackball",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d54447229c7389a9bb37ea9bcaa277f7f204c5b.jpeg",
    hostname: "candrews.integralblue.com",
  },
  {
    url: "https://ergodox-ez.com/",
    title: "ErgoDox EZ: An Incredible Mechanical Ergonomic Keyboard ...",
    icon: "https://serpapi.com/searches/667929a7fe41d0876f233863/images/97751a965012f42d144849637d5444729bae5811c9809505da7e860b2c90d622.png",
    hostname: "ergodox-ez.com",
  },
];

const keyboardSnippets = [
  {
    url: "https://www.rtings.com/keyboard/reviews/best/ergonomic",
    hostname: "www.rtings.com",
    title: "The 4 Best Ergonomic Keyboards - Summer 2024",
    content:
      "Using a keyboard can be uncomfortable and hard on your body. Conventional, straight keyboards require you to bend your wrists in a way that can be painful for some, especially for long periods.",
    themeId: "id-1",
  },
  {
    url: "https://www.engadget.com/best-ergonomic-keyboard-130047982.html",
    hostname: "www.engadget.com",
    title: "The best ergonomic keyboards for 2024",
    content:
      "Traditional keyboards keep your arms close together and force you to splay your hands outward. After a while, that can feel straining. By shifting the orientation of the keys, ergonomic keyboards can keep your upper body in a more neutral position, preventing you from twisting or over-extending your hands and arms.",
    themeId: "id-1",
  },
  {
    url: "https://www.rtings.com/keyboard/reviews/best/ergonomic",
    hostname: "www.rtings.com",
    title: "The 4 Best Ergonomic Keyboards - Summer 2024",
    content:
      "For most people looking for an ergonomic keyboard, we recommend the Logitech ERGO K860. It has a very comfortable plush wrist rest and a wave-like shape...This shape aligns your hands, wrists, and elbows in a neutral position that isn't as taxing on your body as a conventional keyboard.",
    themeId: "id-2",
  },
  {
    url: "https://www.engadget.com/best-ergonomic-keyboard-130047982.html",
    hostname: "www.engadget.com",
    title: "The best ergonomic keyboards for 2024",
    content:
      "Logitech Ergo K860 Wireless Split: Best wireless ergonomic keyboard",
    themeId: "id-2",
  },
];

const keyboardThemes = [
  {
    id: "id-1",
    title: "Introduction to Ergonomic Keyboards",
    relevanceScore: 5,
  },
  {
    id: "id-2",
    title: "Top Recommendation for Beginners",
    relevanceScore: 9,
  },
];

const glassesSources = [
  {
    url: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-prescription-glasses-online/",
    title: "Best Prescription Glasses Online 2024",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a435511edf10bed2b3823eb62c77fb44e39.png",
    hostname: "www.forbes.com",
    summary:
      "Buying prescription glasses online saves money and offers convenience. GlassesUSA excels with diverse styles, virtual try-on, and prescription renewal. Eyebuydirect offers affordable glasses, and Warby Parker stands out for its style. Expert feedback and testing informed the best options across categories.",
  },
  {
    url: "https://www.nytimes.com/wirecutter/reviews/best-places-to-buy-glasses-online/",
    title: "The Best Places to Buy Glasses Online",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a43e3019739c47850b0fb09ab160c9590b3.png",
    hostname: "www.nytimes.com",
    summary:
      "The article evaluates online glasses retailers, recommending Eyebuydirect and Zenni Optical for cost and quality. It outlines the benefits and requirements of online shopping and advises attention to prescription accuracy, especially with complex lenses.",
  },
  {
    url: "https://www.cbsnews.com/essentials/where-to-buy-cheap-prescription-glasses/",
    title: "Best places to buy cheap prescription glasses online",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a4304b5a54ebc6476a98855f52d8b08b289.png",
    hostname: "www.cbsnews.com",
    summary:
      "Prescription glasses now cost under $100 with options like GlassesUSA, Zenni Optical, and Warby Parker. These retailers offer various lenses and frames, money-back guarantees, and virtual try-ons, with discounts for students, military, and first responders.",
  },
  {
    url: "https://www.cnet.com/health/personal-care/best-places-to-buy-glasses-online/",
    title: "Best Places to Buy Glasses Online for 2024",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a43fffc56a49e44d34d8a86c0a4e0008131.png",
    hostname: "www.cnet.com",
    summary:
      "Buying glasses online in 2024 is convenient and cost-effective. Key considerations include customer reviews, product range, price transparency, and shipping. Zenni is best for budget, Warby Parker for shopping experience, EyeBuyDirect for fast delivery. Prices range from under $100 to $400 for premium pairs.",
  },
  {
    url: "https://www.reddit.com/r/Frugal/comments/113pvmc/where_to_buy_affordable_prescription_glasses/",
    title: "where to buy affordable prescription glasses online?",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a4327d9cecaf04bc03b12bda400b6320c3f.png",
    hostname: "www.reddit.com",
  },
  {
    url: "https://www.gq.com/story/where-to-buy-glasses-online",
    title: "Where to Buy Glasses Online Without Leaving Your Couch",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a43dabdb32405ab23a39019df20e8981a08.png",
    hostname: "www.gq.com",
  },
  {
    url: "https://www.consumerreports.org/health/vision-eye-care/expert-advice-on-buying-eyeglasses-frames-lenses-coatings-a4033707605/",
    title: "Buy Glasses Like a Pro: Frames, Lenses, Coatings, and More",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a43e9fec7897dd953e757d6545d85d2affa.png",
    hostname: "www.consumerreports.org",
  },
  {
    url: "https://community.clark.com/t/where-is-your-favorite-place-to-buy-eyeglasses/73",
    title: "Where Is Your Favorite Place To Buy Eyeglasses?",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a43ca0355b9decf26d4dd1d749c44a40117.png",
    hostname: "community.clark.com",
  },
  {
    url: "https://www.quora.com/Is-it-reliable-and-more-affordable-to-buy-prescription-glasses-online",
    title: "Is it reliable and more affordable to buy prescription ...",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a434c9c483e782bf5266a6c7c645ed77347.png",
    hostname: "www.quora.com",
  },
  {
    url: "https://forum.quartertothree.com/t/where-do-you-get-glasses-online/161077",
    title: "Where do you get glasses online? - Everything else",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a43277ff7bac8f87c1516ff52900ea43c0a.png",
    hostname: "forum.quartertothree.com",
  },
  {
    url: "https://2peasrefugees.boards.net/thread/139808/where-buy-eye-glasses",
    title: "Where do you buy (eye) glasses? | 2Peas Refugees",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a432ebfd4c69599d6c29d4871486932293d.png",
    hostname: "2peasrefugees.boards.net",
  },
  {
    url: "https://www.readers.com/",
    title: "Best Online Reading Glasses Store | Readers.com®",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a431cf3c510cc317ba089dd56d85c80b682.png",
    hostname: "www.readers.com",
  },
  {
    url: "https://sewing.patternreview.com/SewingDiscussions/topic/123948",
    title: "Prescription glasses online - Sewing Pattern Review",
    icon: "https://serpapi.com/searches/66792d55f26ac6f2736a7db8/images/236f100b83d5772c1261cc7778242a437e7b82d1561156a470518445ff1a7114.png",
    hostname: "sewing.patternreview.com",
  },
];

const glassesSnippets = [
  {
    url: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-prescription-glasses-online/",
    hostname: "www.forbes.com",
    title: "Best Prescription Glasses Online 2024",
    content:
      "Eyebuydirect’s wallet-friendly prices make clear vision affordable and accessible. To keep prices down on Eyebuydirect’s own styles, everything from concept to design to manufacturing is done in-house.",
    themeId: "id-1",
  },
  {
    url: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-prescription-glasses-online/",
    hostname: "www.forbes.com",
    title: "Best Prescription Glasses Online 2024",
    content:
      "GlassesUSA is one of the largest and best online prescription glasses retailers, offering hundreds of designer frames from Ray-Ban, Gucci and Oakley, along with less expensive house brands in every frame style and color you can imagine.",
    themeId: "id-1",
  },
  {
    url: "https://www.cbsnews.com/essentials/where-to-buy-cheap-prescription-glasses/",
    hostname: "www.cbsnews.com",
    title: "Best places to buy cheap prescription glasses online",
    content:
      "Zenni Optical is known for ultra-low cost frames, which range in price from a mere $6.95 to $59.95 with single-focus, basic prescription lenses included.",
    themeId: "id-1",
  },
  {
    url: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-prescription-glasses-online/",
    hostname: "www.forbes.com",
    title: "Best Prescription Glasses Online 2024",
    content:
      "Sites like GlassesUSA (our top pick overall) let you renew expired prescriptions with a virtual vision test.",
    theme: "Special Features and Services",
    themeId: "id-2",
  },
  {
    url: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-prescription-glasses-online/",
    hostname: "www.forbes.com",
    title: "Best Prescription Glasses Online 2024",
    content:
      "many online retailers provide virtual try-on features and generous return policies.",
    themeId: "id-2",
  },
];

const glassesThemes = [
  {
    id: "id-1",
    title: "Best Overall Retailers",
    relevanceScore: 9,
  },
  {
    id: "id-2",
    title: "Special Features and Services",
    relevanceScore: 5,
  },
];
export const searchExamplesList: SearchExample[] = [
  {
    query: "how to get startup ideas",
    sourceMetadatas: startupSources,
    snippets: startupSnippets,
    themes: startupThemes,
  },
  {
    query: "reviews of a case against education",
    sourceMetadatas: educationSources,
    snippets: educationSnippets,
    themes: educationThemes,
  },
  {
    query: "good first ergonomic keyboard",
    sourceMetadatas: keyboardSources,
    snippets: keyboardSnippets,
    themes: keyboardThemes,
  },
  {
    query: "best places to buy glasses online",
    sourceMetadatas: glassesSources,
    snippets: glassesSnippets,
    themes: glassesThemes,
  },
  {
    query: "is creatine safe",
    sourceMetadatas: creatineSources,
    snippets: creatineSnippets,
    themes: creatineThemes,
  },

  {
    query: "best oil for oven fries",
    sourceMetadatas: ovenFriesSources,
    snippets: ovenFriesSnippets,
    themes: ovenFriesThemes,
  },
];
