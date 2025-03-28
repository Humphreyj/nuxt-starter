import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { userId, commentId, receiverId } = body

  await prisma.like.deleteMany({
    where: {
      userId: userId,
      commentId: commentId,
      receiverId: receiverId,
    },
  })
  // Optionally, you could return the updated comment or a success message
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
