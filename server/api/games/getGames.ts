import { games } from '~/server/data/games'
export default defineEventHandler(async (event) => {
  // return a list of GameData

  return {
    games: games,
  }
})
