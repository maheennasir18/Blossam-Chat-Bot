# 🌸 Blossom – Chat with the Powerpuff Girl

A **Blossom-themed animated chat app** where Blossom (the leader of the Powerpuff Girls) talks to you. The brain behind her replies is **Google’s Gemini API** ([Google AI for Developers](https://ai.google.dev/gemini-api/docs)) with a **free tier** at Google AI Studio.

Built with **Vite + TypeScript + React**.

---

## What You Have (First-Time Overview)

| Part | What it does |
|------|----------------|
| **Vite** | Build tool: fast dev server, bundles your app for production |
| **React** | UI library: the chat screen is built from components |
| **TypeScript** | Typed JavaScript: fewer bugs, better editor help |
| **Google Gemini API** | Chat completions from Gemini; Blossom’s replies stream from the model (default: `gemini-2.0-flash-lite`) |

**Flow:** You type → this app sends your message to the Gemini API → Blossom’s reply streams back into the chat.

**Features:** Hero section with Blossom, prompt templates for quick questions, message list with streaming, and optional mock answers when the API is unavailable.

---

## Quick Start

### 1. Install dependencies

From the project folder:

```bash
npm install
```

### 2. Get a Google AI API key (free tier)

Create an API key at [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Configure this app

```bash
# Windows
copy .env.example .env

# Mac / Linux
cp .env.example .env
```

Edit `.env` and set your key:

- **`VITE_GOOGLE_AI_API_KEY`** – Your Google AI API key. Never commit `.env` or share this key.

### 4. Run the Blossom app

```bash
npm run dev
```

Open **http://localhost:5173** in your browser. You should see Blossom’s chat; type a message and she’ll reply using Gemini (default: `gemini-2.0-flash-lite`).

---

## Project Structure

```
Blossam-Chat-Bot/
├── index.html              # Single HTML page; root div and script tag
├── src/
│   ├── main.tsx            # Entry: mounts the React app into #root
│   ├── App.tsx             # Main screen: header, hero, message list, input, send logic
│   ├── App.css             # Blossom styling and layout
│   ├── index.css           # Global styles and CSS variables (theme)
│   ├── api/
│   │   └── openWebUI.ts    # Google Gemini API (streaming + non-streaming)
│   ├── components/
│   │   ├── BlossomHero.tsx # Hero section with Blossom image and sparkles
│   │   ├── ChatInput.tsx   # Message input and send button
│   │   ├── ErrorBanner.tsx # API error display
│   │   ├── Header.tsx      # App header
│   │   ├── MessageBubble.tsx   # Single message (user or assistant)
│   │   ├── MessageList.tsx     # Scrollable list of messages
│   │   ├── PromptTemplates.tsx # Quick-question chips
│   │   └── index.ts        # Component exports
│   ├── constants/
│   │   └── blossom.ts      # BLOSSOM_SYSTEM_PROMPT, INITIAL_MESSAGE, PROMPT_TEMPLATES
│   ├── hooks/
│   │   └── useChat.ts      # Chat state, send message, streaming
│   ├── types/
│   │   └── chat.ts         # Chat-related TypeScript types
│   ├── utils/
│   │   └── mockAnswers.ts  # Fallback answers when API is unavailable
│   └── vite-env.d.ts       # TypeScript types for Vite env (e.g. VITE_GOOGLE_AI_API_KEY)
├── assets/                 # Images (e.g. blossom-powerpuff.png)
├── public/                 # Static assets (favicon, etc.)
├── vite.config.ts          # Vite config: React plugin
├── .env.example            # Template for .env (Google AI API key)
└── package.json            # Scripts and dependencies
```

- **Changing Blossom’s personality:** Edit `BLOSSOM_SYSTEM_PROMPT` in `src/constants/blossom.ts`.
- **Changing theme/colors:** Edit the `:root` variables in `src/index.css`.
- **How we talk to the LLM:** See `src/api/openWebUI.ts`; it uses the [Google Gemini API](https://ai.google.dev/gemini-api/docs) via `@google/genai` with optional streaming.

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run build` | TypeScript check + production build (output in `dist/`) |
| `npm run preview` | Serve the production build locally |

---

## Troubleshooting

- **“Couldn’t reach the brain power” / 403 or network errors**  
  - Ensure `VITE_GOOGLE_AI_API_KEY` is set in `.env` with a valid key from [Google AI Studio](https://aistudio.google.com/apikey).  
  - Restart the dev server after changing `.env`.

- **No reply / wrong model**  
  The default model is `gemini-2.0-flash-lite`. You can change it in `src/api/openWebUI.ts` (e.g. to `gemini-2.0-flash` or `gemini-1.5-pro`) if needed.

---

Have fun chatting with Blossom. 🌸
