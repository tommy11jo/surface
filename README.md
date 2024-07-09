# Surface

Andrej Karpathy [writes](https://twitter.com/karpathy/status/1804187473167421798) on twitter:
"One built-in UI/UX feature of LLM interfaces I'd love is proof... A feature that automatically brings in original material / reputable sources and highlights relevant sections as proof alongside factual generations would be very cool."

Well, this is my attempt! [Surface](https://surface-omega.vercel.app/) is a website for quick AI answers, verified using web resources.
It also demonstrates an interface and prompting approach for verifying claims in model responses, which could be integrated into conversational interfaces like [claude.ai](https://claude.ai) and [chatgpt.com](https://chatgpt.com).

This project focuses on mitigating factual errors, which are hard for users to spot and evaluate.
The status quo is high-effort manual web searches.

See examples [here](https://surface-omega.vercel.app/).
Or, if you'd like to try it, ask me for a code.
TODO: dev setup

**Prompting Approach**
Unlike tools like Perplexity which use RAG, Surface allows the model to respond freely and generate facts directly from its weights.
These facts are then verified using snippets from web resources.

1. The model responds directly, while identifying the claims it wishes to check and suggesting a search query to investigate each claim.
2. Then, each search query is executed on Bing Search API to get URLs. The URLs are used to get webpage text using [Jina AI's Reader](https://jina.ai/reader/). The webpage texts are used to identify direct evidence and evaluate the truth of each claim.
3. The evidence and truth judgment of each claim are then directly shown to the user.

**UI/UX Approach**
To the right of the model response, Surface shows proof of the core claims.
Each claim has 1-2 relevant snippets and is categorized as probably correct, maybe correct, incorrect, or unknown.
The user doesn't have to trust this categorization; they can come to a conclusion themselves.
These snippets often provide detailed supporting context for a claim and serve as entrypoints for the user to visit a webpage and learn more.

Adjacent approaches include:

1. Perplexity: which inserts the quotations in the response
2. Gemini's double-check feature: overlays the response with highlights that require interaction to see one piece of evidence.

More details:

- The user can view a direct quotation and info about where it came from (title, hostname) in one glance.
- Visual cues include basic highlighting and the visual vocabulary of word editors (e.g. the red squiggly line).
- Sentences are used for presentation (e.g. "The claim is 'probably correct'")
- Facts are verified as soon as they are fully formed, for maximal speed.
- The user can navigate away from a model response and come back directly to it (like a search results page). Nextjs does not allow me change their default cache control headers, so I could not use bfcache sadly.

**Potential Applications**
This could potentially be integrated into current conversational interfaces, though it might cause a longer custom system prompt and on-the-fly parsing of the response (though Anthropic is already doing this I think 👀).
A lighter-weight approach is to add a verify button after each response that triggers a similar process and shows a similar interface.

**Next Steps:**

- Present the option to regenerate the response, with the relevant webpage text included in the context.
- Have the model output search queries when it needs specific facts, rather than responding directly each time.
- Improve Bing Search prompt
