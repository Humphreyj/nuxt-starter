import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { gameId, userId, isRecommended } = body

  await prisma.gameRating.create({
    data: {
      gameId: gameId,
      userId: userId,
      isRecommended: isRecommended,
    },
  })

  return { success: true }
})
