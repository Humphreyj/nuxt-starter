export interface GameData {
  id: string
  title: string
  description: string
  review: string
  rating: string
  price: number
  purchase_price: number
  release_date: string
  publisher: string
  developer: string
  tags: string[]
  platform: string
  images?: {
    cover: string
    screenshots: string[]
  }
}

export interface GameReview {
  id: string
  game_id: string
  user_id: string
  rating: number
  review: string
  created_at: string
  updated_at: string
}
