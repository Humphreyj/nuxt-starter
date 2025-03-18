import { articles } from '~/server/data/articles'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const gameId = query.gameId

  if (gameId) {
    // Filter articles by gameId
    const filteredArticles = articles.filter(
      (article) => article.gameId === gameId,
    )
    return { articles: filteredArticles }
  }

  // Return all articles if no gameId is provided
  return { articles }
})
