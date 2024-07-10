# Surface

Andrej Karpathy [writes](https://twitter.com/karpathy/status/1804187473167421798) on twitter:
"One built-in UI/UX feature of LLM interfaces I'd love is proof... A feature that automatically brings in original material / reputable sources and highlights relevant sections as proof alongside factual generations would be very cool."

[Surface](https://surface-omega.vercel.app/) is a website for quick AI answers, verified using web resources.
It also demonstrates an interface and prompting approach for verifying claims in model responses, which could be integrated into conversational interfaces like [claude.ai](https://claude.ai) and [chatgpt.com](https://chatgpt.com).

This project focuses on mitigating factual errors, which are hard for users to spot and evaluate.
The status quo is high-effort manual web searches.

See examples [here](https://surface-omega.vercel.app/).
TODO: dev setup

**Prompting Approach**  
Unlike tools like Perplexity which use RAG, Surface allows the model to generate facts directly from its weights.
These facts are then verified using snippets from web resources.

1. The model responds directly, while identifying the claims it wishes to check and suggesting a search query to investigate each claim. Then, for each claim and search query pair:
2. The search query is searched using Bing Search API to get URLs.
3. The URLs are used to get webpage text using [Jina AI's Reader](https://jina.ai/reader/).
4. The webpage texts are used to identify direct evidence and evaluate the truth of each claim.

**UI/UX Approach**  
To the right of the model response, Surface shows proof of the core claims.
Each claim has 1-3 relevant snippets and is categorized as supported, doubted, or not verified.
The user doesn't have to trust this categorization; they can read the snippets to come to a conclusion themselves.
These snippets often provide detailed supporting context for a claim and act as entrypoints for a user to visit a webpage and learn more.

Adjacent approaches include:

1. Perplexity: Inserts the quotations in the response.
2. Gemini's double-check feature: Overlays the response with highlights that require interaction to see one piece of evidence.

**Known Issues**

- Doing the parsing of the model response with claims on the frontend instead of the backend.

**Next Steps**

- Present the option to regenerate the response, with the relevant webpage text included in the context.
- Have the model output search queries when it needs specific facts, rather than responding directly each time.
