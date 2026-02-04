import { memo } from 'react'
import { PROMPT_TEMPLATES } from '../constants/blossom'

interface PromptTemplatesProps {
  onSelect: (text: string) => void
  disabled?: boolean
}

export const PromptTemplates = memo(function PromptTemplates({
  onSelect,
  disabled = false,
}: PromptTemplatesProps) {
  return (
    <section className="prompt-templates" aria-label="Quick questions for Blossom">
      <p className="prompt-templates-title">
        <span className="prompt-templates-sparkle" aria-hidden>
          ✨
        </span>
        <span className="prompt-templates-sparkle prompt-templates-butterfly" aria-hidden>
          🦋
        </span>
        Ask Blossom something fun
        <span className="prompt-templates-sparkle" aria-hidden>
          🌸
        </span>
        <span className="prompt-templates-sparkle" aria-hidden>
          ✨
        </span>
      </p>
      <div className="prompt-templates-list">
        {PROMPT_TEMPLATES.map((item, i) => (
          <button
            key={`${item.icon}-${i}`}
            type="button"
            className="prompt-tag"
            onClick={() => onSelect(item.text)}
            disabled={disabled}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className="prompt-tag-icon">{item.icon}</span>
            <span className="prompt-tag-text">{item.text}</span>
            <span className="prompt-tag-sparkle" aria-hidden>
              ✦
            </span>
          </button>
        ))}
      </div>
    </section>
  )
})
