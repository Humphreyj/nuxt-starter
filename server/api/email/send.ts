export default defineEventHandler(() => {
  const { sendMail } = useNodeMailer()

  return sendMail({
    subject: 'Nuxt + nodemailer',
    text: 'Hello from nuxt-nodemailer!',
    to: 'joshhumphrey1@gmail.com',
  })
})
