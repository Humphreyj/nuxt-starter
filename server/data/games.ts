import { GameData } from '~/types'

export const games: GameData[] = [
  {
    id: 'ad42460c-7656-4fa1-8a4e-41d066547f06',
    title: 'Starcom: Nexus',
    description:
      'Starcom: Nexus is a space exploration game where you build your own starship and explore the galaxy.',
    review:
      'Starcom: Nexus is a space exploration game that combines elements of adventure and strategy. The game allows players to build their own starship and explore a vast galaxy filled with unique planets, alien species, and mysterious phenomena. The graphics are stunning, and the gameplay is engaging, making it a must-play for fans of the genre.',
    rating: 'Damn Good',
    price: 19.99,
    purchase_price: 3.99,
    release_date: '12-19-2019',
    publisher: 'Wx3 Labs, LLC',
    developer: 'Wx3 Labs, LLC',
    tags: ['Space', 'Adventure', 'Indie'],
    platform: 'PC',
    images: {
      cover: '/img/starcomCover.jpg',
      screenshots: [
        '/img/starcom/battle.jpg',
        '/img/starcom/battle.jpg',
        '/img/starcom/battle.jpg',
      ],
    },
  },
]
