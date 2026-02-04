import { useState, useRef, useEffect, useCallback } from 'react'
import { streamChatCompletion, type ChatMessage } from '../api/openWebUI'
import type { Message } from '../types/chat'
import { BLOSSOM_SYSTEM_PROMPT, INITIAL_MESSAGE } from '../constants/blossom'
import { isApiError429Or500, getMockAnswerForQuestion, parseApiErrorMessage } from '../utils/mockAnswers'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessage = useCallback(
    async (templateText?: string) => {
      const text = (templateText ?? input).trim()
      if (!text || loading) return

      setInput('')
      setError(null)

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
      }
      const assistantId = `assistant-${Date.now()}`
      const assistantMsg: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      }

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setLoading(true)

      const apiMessages: ChatMessage[] = [
        { role: 'system', content: BLOSSOM_SYSTEM_PROMPT },
        ...messages
          .filter((m) => m.role !== 'assistant' || !m.isStreaming)
          .map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: text },
      ]

      try {
        await streamChatCompletion(
          { messages: apiMessages, stream: true },
          (chunk) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantId ? { ...msg, content: msg.content + chunk } : msg
              )
            )
          },
          () => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantId ? { ...msg, isStreaming: false } : msg
              )
            )
            setLoading(false)
          }
        )
      } catch (err) {
        const message = parseApiErrorMessage(err)
        const useMock = isApiError429Or500(err)
        if (useMock) {
          setError(
            'Showing a fun answer while the brain power recharges! Try again later for a fresh reply.'
          )
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: getMockAnswerForQuestion(text), isStreaming: false }
                : msg
            )
          )
        } else {
          setError(message)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    content: `Sorry, I couldn't reach the brain power right now. ${message}`,
                    isStreaming: false,
                  }
                : msg
            )
          )
        }
        setLoading(false)
      }
    },
    [input, loading, messages]
  )

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    messagesEndRef,
    sendMessage,
  }
}
