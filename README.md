# Surface

Andrej Karpathy [writes](https://twitter.com/karpathy/status/1804187473167421798) on twitter:
"One built-in UI/UX feature of LLM interfaces I'd love is proof... A feature that automatically brings in original material / reputable sources and highlights relevant sections as proof alongside factual generations would be very cool."

[Surface](https://surface-omega.vercel.app/) is a website for quick AI answers, verified using web resources.
It also demonstrates an interface and prompting approach for verifying claims in model responses, which could be integrated into conversational interfaces like [claude.ai](https://claude.ai) and [chatgpt.com](https://chatgpt.com). With those interfaces, a user typically has to do a manual web search to verify a fact.

![NextJS Example](/public/nextjs-example.png)

See more examples on the [website](https://surface-omega.vercel.app/).

**Prompting Approach**

1. The model responds directly, while identifying the claims it wishes to check and suggesting a search query to investigate each claim. Then, for each claim and search query pair:
2. The search query is searched using Bing Search API to get URLs.
3. The URLs are used to get webpage text using [Jina AI's Reader](https://jina.ai/reader/).
4. The webpage texts are used to identify direct evidence and evaluate the truth of each claim.

**Dev Setup**

0. Env vars

In the backend, you will need an anthropic api key and a bing search api key:

```env
# backend/.env
NODE_ENV=development
ANTHROPIC_API_KEY=...
SECRET_CODES_ANSWER=exampleKey1, exampleKey2
BING_SEARCH_V7_SUBSCRIPTION_KEY=...
TUNNEL_TOKEN=dummy_value
```

In the frontend:

```env
# frontend/.env
NEXT_PUBLIC_API_PREFIX=http://localhost:80
```

1. Install deps in `frontend/`

```bash
npm run install
```

2. Install deps in `backend/`

```bash
npm run install
```

3. Start the nextjs frontend in `frontend/`

```bash
npm run dev
```

4. Start the docker backend in `backend/`.

```bash
npm run dev
```

5. Navigate to `http://localhost:3000` in your browser. Enter one of the secret codes from the .env file above.

**Known Issues**

- I should have done the parsing of the model response with claims on the backend, not the frontend
- Backend docker does not refresh

**Next Steps**

- Present the option to regenerate the response, with the relevant webpage text included in the context.
- The model sometimes recognizes when it needs more information. In that case, do the typical RAG approach (like Perplexity). This is an approach to mitigate no
