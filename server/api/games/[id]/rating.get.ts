// import { comments } from '~/server/data/comments'
import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const { gameId } = event.context.params || {}
  const ratings = prisma.gameRating.findMany({
    where: {
      gameId: gameId,
    },
    include: {
      user: true,
    },

    orderBy: {
      createdAt: 'desc', // Order comments by creation date, most recent first
    },
  })
  return ratings
})
