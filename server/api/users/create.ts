import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const {
      email,
      password,
      name,
      provider,
      providerId,
      avatarUrl,
      displayName,
    } = body

    if (!email) {
      throw createError({ statusCode: 400, statusMessage: 'Email is required' })
    }

    // Hash password if provided (only for password-based users)
    const hashedPassword = password ? await hashPassword(password) : null

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider,
        providerId,
        avatarUrl,
        comments: [],
        likesReceived: [],
        displayName,
      },
    })

    return { message: 'User created successfully', user }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return createError({ statusCode: 500, statusMessage: errorMessage })
  }
})
