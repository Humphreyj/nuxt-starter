import prisma from '~/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { comment } = body
  const updatedComment = await prisma.comment.update({
    where: {
      id: comment.id,
    },
    data: {
      ...comment,
    },
  })

  return updatedComment
})
