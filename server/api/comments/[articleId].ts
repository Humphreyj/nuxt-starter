// import { comments } from '~/server/data/comments'
import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const { articleId } = event.context.params || {}
  const comments = prisma.comment.findMany({
    where: {
      articleId: articleId,
    },
    include: {
      user: true,
      likes: true, // Include likes for each comment
    },

    orderBy: {
      createdAt: 'desc', // Order comments by creation date, most recent first
    },
  })
  return comments
})
