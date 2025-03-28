export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, '/')
  },
  async onError(event, { error }) {
    console.error('OAuth Error:', error)
    return sendRedirect(event, '/auth/login')
  },
})
