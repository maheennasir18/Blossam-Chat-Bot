import { memo, type RefObject } from 'react'
import type { Message } from '../types/chat'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: Message[]
  messagesEndRef: RefObject<HTMLDivElement>
}

export const MessageList = memo(function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
    <div className="messages">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
})
