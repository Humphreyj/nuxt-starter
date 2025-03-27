import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = typeof query.token === 'string' ? query.token : null

  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Token is required' })
  }

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  })

  if (!user) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid token' })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken: null, emailVerified: true },
  })
  await setUserSession(event, {
    user: {
      id: user.id,
      avatarUrl: user.avatarUrl,
      displayName: user.displayName,
      emailVerified: true,
    },
    loggedInAt: Date.now(),
  })

  return sendRedirect(event, '/auth/login', 302)
})
