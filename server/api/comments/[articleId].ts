import { comments } from '~/server/data/comments'

export default defineEventHandler(async (event) => {
  const { articleId } = event.context.params || {}
  const articleComments = comments.filter(
    (comment) => comment.articleId === articleId,
  )
  return articleComments
})
