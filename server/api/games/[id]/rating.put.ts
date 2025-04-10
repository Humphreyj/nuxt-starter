import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { ratingId, isRecommended } = body

  const updatedRating = await prisma.gameRating.update({
    where: {
      id: ratingId,
    },
    data: {
      isRecommended: isRecommended,
    },
  })

  return updatedRating
})
