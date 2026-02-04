import { memo } from 'react'
import type { Message } from '../types/chat'

interface MessageBubbleProps {
  message: Message
}

export const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant'
  const displayText = message.content || (message.isStreaming ? '' : '…')

  return (
    <div
      className={`message message--${message.role}`}
      data-streaming={message.isStreaming ?? false}
    >
      {isAssistant && (
        <div className="message-avatar-wrap" aria-hidden>
          <span className="message-avatar-sparkle message-avatar-sparkle--1" />
          <span className="message-avatar-sparkle message-avatar-sparkle--2" />
          <span className="message-avatar-sparkle message-avatar-sparkle--3" />
          <span className="message-avatar-sparkle message-avatar-sparkle--4" />
          <span className="message-avatar-sparkle message-avatar-sparkle--5" />
          <span className="message-avatar-sparkle message-avatar-sparkle--6" />
          <span className="message-avatar-sparkle message-avatar-sparkle--7" />
          <span className="message-avatar-sparkle message-avatar-sparkle--8" />
          <span className="message-avatar-glitter message-avatar-glitter--1" />
          <span className="message-avatar-glitter message-avatar-glitter--2" />
          <span className="message-avatar-glitter message-avatar-glitter--3" />
          <span className="message-avatar-glitter message-avatar-glitter--4" />
          <span className="message-avatar-glitter message-avatar-glitter--5" />
          <div className="message-avatar message-avatar--blossom" />
        </div>
      )}
      <div className="message-bubble">
        <p className="message-text">{displayText}</p>
        {message.isStreaming && (
          <span className="typing-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        )}
      </div>
    </div>
  )
})
