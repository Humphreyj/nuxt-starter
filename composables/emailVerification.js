export const useEmailVerification = ({
  user,
  onVerified,
  checkUserFn,
  options = {},
}) => {
  const {
    baseInterval = 10000, // Start polling at 10 seconds
    maxInterval = 300000, // Max 5 minutes between checks
    maxAttempts = 20, // Limit total checks
    backoffRate = 1.5, // How quickly to increase intervals
  } = options

  const isPolling = ref(false)
  let pollingTimer = null
  let attempts = 0

  const startPolling = () => {
    if (!user.value || user.value.emailVerified || isPolling.value) return

    isPolling.value = true
    attempts = 0
    scheduleNextCheck(baseInterval)
  }
  const checkVerification = async () => {
    if (!user.value) {
      stopPolling()
      return
    }

    try {
      // Call the provided function to refresh user data
      await checkUserFn(user.value.id)

      // Check if email is now verified
      if (user.value.emailVerified) {
        stopPolling()
        onVerified?.()
        return
      }

      // Track attempts and potentially stop polling
      attempts++
      if (attempts >= maxAttempts) {
        stopPolling()
        return
      }

      // Calculate next interval with exponential backoff
      const nextInterval = Math.min(
        baseInterval * Math.pow(backoffRate, attempts),
        maxInterval,
      )

      scheduleNextCheck(nextInterval)
    } catch (error) {
      console.error('Verification check failed:', error)
      stopPolling()
    }
  }

  const scheduleNextCheck = (interval) => {
    pollingTimer = setTimeout(checkVerification, interval)
  }

  const stopPolling = () => {
    clearTimeout(pollingTimer)
    pollingTimer = null
    isPolling.value = false
    attempts = 0
  }

  // Clean up on component unmount
  onUnmounted(() => {
    stopPolling()
  })

  return {
    isPolling,
    startPolling,
    stopPolling,
  }
}
