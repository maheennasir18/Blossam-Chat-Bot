/**
 * Google Generative AI (Gemini) Chat API via @google/genai
 * -------------------------------------------------------
 * Uses the official @google/genai SDK. Free tier with Gemini 2.0 Flash-Lite / 2.0 Flash.
 * https://ai.google.dev/gemini-api/docs
 *
 * Setup:
 * 1. Get an API key from https://aistudio.google.com/apikey
 * 2. Copy .env.example to .env and set:
 *    VITE_GOOGLE_AI_API_KEY=your-key-here
 *
 * Never commit your .env or expose your API key in production.
 */

import { GoogleGenAI } from '@google/genai'

/** Default: free-tier friendly. Use "gemini-2.0-flash" for more capability. */
const DEFAULT_MODEL = 'gemini-2.0-flash-lite'

const getApiKey = () => import.meta.env.VITE_GOOGLE_AI_API_KEY || ''

function getClient(): GoogleGenAI {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('VITE_GOOGLE_AI_API_KEY is not set in .env')
  }
  return new GoogleGenAI({ apiKey })
}

/** Message roles; system/developer become systemInstruction in the API. */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'developer'
  content: string
}

export interface ChatCompletionOptions {
  model?: string
  messages: ChatMessage[]
  stream?: boolean
}

/** Build SDK params: systemInstruction from system/developer messages, contents as user/model turns. */
function buildParams(options: ChatCompletionOptions): {
  model: string
  contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
  config?: { systemInstruction?: string }
} {
  const systemParts: string[] = []
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []
  for (const m of options.messages) {
    const text = m.content?.trim() ?? ''
    if (!text) continue
    if (m.role === 'system' || m.role === 'developer') {
      systemParts.push(text)
      continue
    }
    const role = m.role === 'assistant' ? 'model' : 'user'
    contents.push({ role, parts: [{ text }] })
  }
  const params: {
    model: string
    contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
    config?: { systemInstruction?: string }
  } = {
    model: options.model ?? DEFAULT_MODEL,
    contents,
  }
  if (systemParts.length > 0) {
    params.config = { systemInstruction: systemParts.join('\n\n') }
  }
  return params
}

/**
 * Send a chat request to Gemini (non-streaming).
 * Returns the assistant's reply text or throws on error.
 */
export async function getChatCompletion(
  options: ChatCompletionOptions
): Promise<string> {
  const ai = getClient()
  const params = buildParams(options)
  const response = await ai.models.generateContent(params)
  const text = response?.text ?? ''
  return text.trim()
}

/**
 * Stream chat completion from Gemini.
 * Calls onChunk with each text delta; onDone when finished.
 */
export async function streamChatCompletion(
  options: ChatCompletionOptions,
  onChunk: (text: string) => void,
  onDone: () => void
): Promise<void> {
  const ai = getClient()
  const params = buildParams(options)
  try {
    const stream = await ai.models.generateContentStream(params)
    for await (const chunk of stream) {
      const text = chunk?.text
      if (text) onChunk(text)
    }
  } finally {
    onDone()
  }
}
