import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  const user = prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      likesReceived: true, // Include related posts if needed
      comments: true, // Include related comments if needed
    },
  })
  return user
})
