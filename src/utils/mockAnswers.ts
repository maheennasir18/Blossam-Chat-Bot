import { PROMPT_TEMPLATES, GENERIC_MOCK_ANSWER } from '../constants/blossom'

/**
 * Parse API error responses (e.g. Google Gemini) that may be nested JSON.
 * Returns a short, user-friendly message instead of raw JSON.
 */
export function parseApiErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (!raw || typeof raw !== 'string') return 'Something went wrong'

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return raw
  }

  if (parsed && typeof parsed === 'object') {
    const obj = parsed as Record<string, unknown>
    let message = obj.message
    if (typeof message === 'string') {
      try {
        const inner = JSON.parse(message) as Record<string, unknown>
        if (inner?.error && typeof inner.error === 'object') {
          const innerErr = (inner.error as Record<string, unknown>).message
          if (typeof innerErr === 'string') return innerErr
        }
        if (typeof inner?.message === 'string') return inner.message
      } catch {
        return message
      }
    }
    if (obj.error && typeof obj.error === 'object') {
      const errMsg = (obj.error as Record<string, unknown>).message
      if (typeof errMsg === 'string') {
        try {
          const inner = JSON.parse(errMsg) as Record<string, unknown>
          if (inner?.error && typeof inner.error === 'object') {
            const innerMsg = (inner.error as Record<string, unknown>).message
            if (typeof innerMsg === 'string') return innerMsg
          }
          if (typeof inner?.message === 'string') return inner.message
        } catch {
          return errMsg
        }
      }
    }
  }

  return raw
}

export function isApiError429Or500(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return /\(429\)|\(500\)|429|500|rate limit|quota|insufficient_quota|server error/i.test(msg)
}

export function getMockAnswerForQuestion(question: string): string {
  const trimmed = question.trim()
  const template = PROMPT_TEMPLATES.find((t) => t.text.trim() === trimmed)
  return template?.mockAnswer ?? GENERIC_MOCK_ANSWER
}
