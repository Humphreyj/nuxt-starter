import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { userId, commentId, receiverId } = body

  await prisma.like.create({
    data: {
      userId: userId,
      commentId: commentId,
      receiverId: receiverId,
    },
  })
  const updatedComment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      likes: true, // Include likes for the comment to reflect the updated state
    },
  })

  return updatedComment
})
