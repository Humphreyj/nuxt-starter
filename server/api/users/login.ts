import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body // Destructure email and password from the request body

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID or email is required',
      })
    }

    // Try finding the user by ID or email
    const user = await prisma.user.findFirst({
      where: { email },
    })
    const isPasswordValid = await verifyPassword(password, user.password) // Check if the password is valid

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }
    delete user.password // Remove the password from the user object for security reasons
    return user
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return createError({ statusCode: 500, statusMessage: errorMessage })
  }
})
