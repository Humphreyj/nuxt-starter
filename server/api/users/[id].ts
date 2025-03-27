import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  const user = prisma.user.findFirst({
    where: {
      id: id,
    },
  })
  return user
})
