export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export interface PromptTemplate {
  icon: string
  text: string
  mockAnswer: string
}
