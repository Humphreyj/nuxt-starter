import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { userId, commentId, receiverId, displayName } = body

  await prisma.like.create({
    data: {
      userId: userId,
      commentId: commentId,
      receiverId: receiverId,
      displayName: displayName,
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
