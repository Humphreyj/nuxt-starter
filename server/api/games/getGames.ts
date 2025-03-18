import { games } from '~/server/data/games'
export default defineEventHandler(async (event) => {
  // return a list of GameData

  return {
    games: games.sort((a, b) => {
      return b.title > a.title ? -1 : 1
    }),
  }
})
