import { type Snippet, type SourceMetadata } from "./types";

export type SearchExample = {
  query: string;
  sourceMetadatas: SourceMetadata[];
  snippets: Snippet[];
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
    theme: "Creatine's General Safety",
  },
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "The International Society of Sports Nutrition (ISSN) regards creatine as safe and concludes it’s one of the most beneficial sports supplements available.",
    theme: "Creatine's General Safety",
  },
  {
    url: "https://www.health.harvard.edu/exercise-and-fitness/what-is-creatine-potential-benefits-and-risks-of-this-popular-supplement",
    hostname: "www.health.harvard.edu",
    content:
      "Otherwise, an adult dose of 3 to 5 grams of creatine daily is safe.",
    theme: "Creatine's General Safety",
  },
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "Despite its research-backed benefits, some people avoid creatine because they worry about potential side effects. These are thought to include kidney damage, liver damage, kidney stones, weight gain, bloating, dehydration, hair loss, muscle cramps, digestive concerns, rhabdomyolysis.",
    theme: "Common Myths and Misconceptions about Creatine",
  },
  {
    url: "https://www.healthline.com/nutrition/creatine-safety-and-side-effects",
    hostname: "www.healthline.com",
    content:
      "There’s a misconception that creatine is suitable only for adult male athletes. Yet, no research suggests it’s unsuitable in recommended doses for adult females.",
    theme: "Common Myths and Misconceptions about Creatine",
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
    theme: 'The Central Argument of "The Case Against Education"',
  },
  {
    url: "https://www.reddit.com/r/TheMotte/comments/cua2dr/review_the_case_against_education_bryan_caplan/",
    hostname: "www.reddit.com",
    content:
      "It marshals an impressive amount and quality of evidence that enormous amounts of the education system are socially wasteful and we’d be better off without them.",
    theme: 'The Central Argument of "The Case Against Education"',
  },
  {
    url: "https://www.reddit.com/r/TheMotte/comments/cua2dr/review_the_case_against_education_bryan_caplan/",
    hostname: "www.reddit.com",
    content:
      "Most of what we’re taught in school is useless. Most of what we’re taught we forget, and plenty of us never learn enough of most subjects to really forget them. What we do learn and remember is not just mostly useless, we are almost totally incapable of generalizing from it.",
    theme: "The Inefficacy of Current Educational Practices",
  },
  {
    url: "https://scottaaronson.blog/?p=3678",
    hostname: "scottaaronson.blog",
    content:
      "In his book, Caplan presents dozens of tables and graphs, but he also repeatedly asks his readers to consult their own memories—exploiting the fact that we all have firsthand experience of school.",
    theme: "The Inefficacy of Current Educational Practices",
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
    theme: "Focus on Problems, Not Solutions",
  },
  {
    url: "https://www.ycombinator.com/library/8g-how-to-get-startup-ideas",
    hostname: "www.ycombinator.com",
    content:
      "The third mistake is to start with a solution instead of a problem. And I'll give an example. So, imagine you come up with a startup idea \"Uber for plumbers.\" It's an app, you push a button, a plumber shows up. This is a solution. What problem does this solve? I don't know. Maybe it's hard to find plumbers. That might be a real problem, but my point is if you come up with an idea like this, you are starting with a solution.",
    theme: "Focus on Problems, Not Solutions",
  },
  {
    url: "https://paulgraham.com/startupideas.html",
    hostname: "paulgraham.com",
    content:
      "The very best startup ideas tend to have three things in common: they're something the founders themselves want, that they themselves can build, and that few others realize are worth doing. Microsoft, Apple, Yahoo, Google, and Facebook all began this way.",
    theme: "Leverage Your Expertise and Experiences",
  },
  {
    url: "https://www.ycombinator.com/library/8g-how-to-get-startup-ideas",
    hostname: "www.ycombinator.com",
    content:
      "You start with what your team is especially good at, and think of ideas that you would have an unfair advantage in executing. The reason this is so effective is that any idea you come up with this way has automatic founder/market fit. You're basically generating all the ideas that have good founder/market fit.",
    theme: "Leverage Your Expertise and Experiences",
  },
];
export const searchExamplesList: SearchExample[] = [
  {
    query: "reviews of a case against education",
    sourceMetadatas: educationSources,
    snippets: educationSnippets,
  },
  {
    query: "how to get good startup ideas",
    sourceMetadatas: startupSources,
    snippets: startupSnippets,
  },
  {
    query: "is creatine safe",
    sourceMetadatas: creatineSources,
    snippets: creatineSnippets,
  },
];
