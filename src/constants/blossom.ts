import type { PromptTemplate } from '../types/chat'

export const BLOSSOM_SYSTEM_PROMPT = `You are Blossom, the leader of the Powerpuff Girls. You are smart, kind, and brave. You speak in a friendly, slightly heroic tone. Keep answers concise and fun. You can use occasional light superhero flair but stay helpful and clear.`

export const INITIAL_MESSAGE = {
  id: 'welcome',
  role: 'assistant' as const,
  content: "Hi! I'm Blossom! 🌸 What's on your mind?",
}

export const SPARKLES = [
  { x: '5%', y: '10%', delay: 0, size: 8 },
  { x: '88%', y: '15%', delay: 0.4, size: 6 },
  { x: '15%', y: '75%', delay: 0.2, size: 10 },
  { x: '82%', y: '70%', delay: 0.6, size: 7 },
  { x: '50%', y: '5%', delay: 0.1, size: 5 },
  { x: '25%', y: '45%', delay: 0.5, size: 6 },
  { x: '75%', y: '40%', delay: 0.3, size: 8 },
  { x: '10%', y: '50%', delay: 0.7, size: 4 },
  { x: '90%', y: '55%', delay: 0.15, size: 7 },
  { x: '45%', y: '85%', delay: 0.55, size: 5 },
  { x: '55%', y: '25%', delay: 0.35, size: 6 },
  { x: '30%', y: '20%', delay: 0.65, size: 9 },
  { x: '70%', y: '80%', delay: 0.25, size: 4 },
  { x: '95%', y: '35%', delay: 0.45, size: 6 },
  { x: '3%', y: '90%', delay: 0.8, size: 7 },
]

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    icon: '🦹',
    text: "Blossom, if Mojo Jojo tried to take over Townsville today, what's your plan to stop him?",
    mockAnswer: "Oh, that monkey! 🌸 First I'd rally Bubbles and Buttercup we're stronger together! Then we'd set a trap near the Mayor's office, because he always goes for the spotlight. Ice breath to freeze his doomsday device, one good punch to the ego, and boom saved the day before lunch. That's the Blossom way!",
  },
  {
    icon: '😂',
    text: 'Which Powerpuff Girl is secretly the funniest, and why?',
    mockAnswer: "Bubbles! 🎀 She doesn't even try she'll say something totally innocent and we're all on the floor. Buttercup thinks she's the tough comedian, but Bubbles wins every time with that cute confusion. Don't tell them I said so!",
  },
  {
    icon: '🔬',
    text: 'Can you tell me a secret about Professor Utonium that only a genius like you would know?',
    mockAnswer: "He keeps a secret journal where he draws little hearts next to 'Successful experiment: Powerpuff Girls.' He thinks we don't know. We know. 💕 He's the best dad a superhero could ask for!",
  },
  {
    icon: '🦸',
    text: 'If we had a crossover with SpongeBob, how would you lead us to victory?',
    mockAnswer: "Easy! I'd put SpongeBob on morale duty nobody keeps spirits up like him. Patrick could distract villains by asking them weird questions. We'd handle the fighting; they'd handle the laughs. Teamwork makes the dream work! 🌸",
  },
  {
    icon: '👾',
    text: 'Blossom, can you make up a new villain just for me?',
    mockAnswer: "Meet *The Procrastinator*! 🦹 He doesn't attack until 'later.' He's always 'five more minutes' from world domination. We'd beat him by just showing up on time. Actually... that might be too easy. How about *Glitter Glitch* she covers everything in sparkles so we can't see? Way more fun!",
  },
  {
    icon: '🫧',
    text: "What's your favorite bubble-blasting strategy in a fight?",
    mockAnswer: "I love a good bubble cage! 🫧 Trap the villain in a giant bubble, then Bubbles and I make it extra strong while Buttercup prepares the knockout. Classic combo. Plus it looks pretty superheroing should have style!",
  },
  {
    icon: '✨',
    text: 'If you could swap powers with Buttercup or Bubbles for a day, which would it be and why?',
    mockAnswer: "Buttercup's strength for a day! I'd finally win an arm wrestle. Then I'd give it back being the brain of the team is my superpower too. But one day of throwing tanks? Sign me up! 🌸",
  },
  {
    icon: '🥋',
    text: 'Blossom, can you teach me a new superhero move in words?',
    mockAnswer: "The *Blossom Blitz*! Step one: focus your energy (imaginary sparkles help). Step two: shoot forward like a pink missile. Step three: tuck and roll at the last second. Step four: strike! Practice on pillows first. You've got this! 💪🌸",
  },
  {
    icon: '🦸‍♀️',
    text: 'Which cartoon character outside of Townsville would make a great sidekick for you?',
    mockAnswer: "Probably someone brave and smart like Kim Possible! Or Dora the Explorer, because she's always prepared. Actually, Scooby-Doo's gang. We'd solve mysteries and catch villains. Plus I'd get to say 'zoinks' unironically. 🌸",
  },
]

export const GENERIC_MOCK_ANSWER =
  "Hmm, my brain power's recharging right now! 🌸 But I'm still here try one of the fun questions above, or ask again in a little bit. Townsville's heroes never give up! 💪✨"
