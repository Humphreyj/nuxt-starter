export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer()
  try {
    const body = await readBody(event)

    const { email, verificationToken } = body

    sendMail({
      subject: 'Verify your email',
      text: 'Thanks for signing up! Please Verify your email.',
      to: email,
      html: `<div>
    <p>Thanks for signing up! Please verify your email by clicking the button below:</p>
    <a href="${process.env.BASE_URL}/users/verify-email?token=${verificationToken}">
      <button>Verify Email</button>
    </a>
  </div>`,
    })

    return { message: 'Verification email re sent.' }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return createError({ statusCode: 500, statusMessage: errorMessage })
  }
})
