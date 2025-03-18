import { articles } from '~/server/data/articles'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const gameId = query.gameId

  if (!gameId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'gameId query parameter is required',
    })
  }

  // Filter articles by gameId
  const filteredArticles = articles.filter(
    (article) => article.gameId === gameId,
  )
  return { articles: filteredArticles }
})
