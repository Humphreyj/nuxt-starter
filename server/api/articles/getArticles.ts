import { articles } from '~/server/data/articles'
export default defineEventHandler(async (event) => {
  // return a list of GameData

  return {
    articles: articles,
  }
})
