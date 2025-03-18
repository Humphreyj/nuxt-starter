import { articles } from '~/server/data/articles'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  const article = articles.find((article) => article.id === id)
  return article
})
