import { PROMPT_TEMPLATES, GENERIC_MOCK_ANSWER } from '../constants/blossom'

export function isApiError429Or500(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return /\(429\)|\(500\)|429|500|rate limit|quota|insufficient_quota|server error/i.test(msg)
}

export function getMockAnswerForQuestion(question: string): string {
  const trimmed = question.trim()
  const template = PROMPT_TEMPLATES.find((t) => t.text.trim() === trimmed)
  return template?.mockAnswer ?? GENERIC_MOCK_ANSWER
}
