import { memo } from 'react'
import { BlossomHero } from './BlossomHero'

export const Header = memo(function Header() {
  return (
    <header className="header">
      <BlossomHero />
      <h1 className="title">Blossom</h1>
      <p className="subtitle">Chat with the leader of the Powerpuff Girls</p>
    </header>
  )
})
