import prisma from '~/lib/prisma'
import { nanoid } from 'nanoid'
export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer()
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
    const verificationToken = nanoid()
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider,
        providerId,
        avatarUrl,
        displayName,
        verificationToken,
        emailVerified: true,
      },
    })

    sendMail({
      subject: 'Verify your email',
      text: 'Thanks for signing up! Please Verify your email.',
      to: email,
      html: `<div>
      <p>Thanks for signing up! Please verify your email by clicking the button below:</p>
      <a href="${process.env.BASE_URL}/users/verify-email?token=${verificationToken}" target="_blank" noopener noreferrer>
        <button>Verify Email</button>
      </a>
    </div>`,
    })

    return { message: 'User created successfully', user }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return createError({ statusCode: 500, statusMessage: errorMessage })
  }
})
