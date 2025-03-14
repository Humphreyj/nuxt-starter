import { games } from '~/server/data/games'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  const game = games.find((game) => game.id === id)
  return game
})
