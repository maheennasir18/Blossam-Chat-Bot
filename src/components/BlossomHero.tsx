import { memo } from 'react'
import blossomImg from '../../assets/blossom-powerpuff.png'
import { SPARKLES } from '../constants/blossom'

export const BlossomHero = memo(function BlossomHero() {
  return (
    <div className="blossom-hero" aria-hidden>
      <div className="blossom-hero-flying">
        {SPARKLES.map((s, i) => (
          <span
            key={`${s.x}-${s.y}-${i}`}
            className="sparkle"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        <span className="glitter glitter--1" />
        <span className="glitter glitter--2" />
        <span className="glitter glitter--3" />
        <span className="glitter glitter--4" />
        <span className="glitter glitter--5" />
        <span className="glitter glitter--6" />
        <img src={blossomImg} alt="" className="blossom-hero-image" />
      </div>
    </div>
  )
})
