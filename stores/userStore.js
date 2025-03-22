import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref(null)

  const checkForUser = () => {
    const { user } = useUserSession()

    if (user.value) {
      currentUser.value = user.value
    }
  }

  const setCurrentUser = (user) => {
    currentUser.value = user
  }
  const toast = useToast()
  const login = async (credentials) => {
    const user = await $fetch('/api/users/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    })

    // toast.add({
    //   color: 'green',
    //   title: 'User logged in successfully',
    // })

    setCurrentUser(user)
  }
  const logout = () => {
    const { clear } = useUserSession()
    currentUser.value = null
    clear()
    toast.add({
      color: 'green',
      title: 'User logged out successfully',
    })
  }

  const signup = async (newUser) => {
    // const hashedPassword = await hashPassword(newUser.password)
    const result = await $fetch('/api/users/create', {
      method: 'POST',
      body: {
        email: newUser.email,
        password: newUser.password,
        name: newUser.displayName,
        displayName: newUser.displayName,
        provider: null, // For OAuth users, set provider details
        providerId: null,
        avatarUrl: null,
      },
    })
    currentUser.value = result.user
  }

  const actions = {
    login,
    logout,
    checkForUser,
    setCurrentUser,
    signup,
  }
  const values = {
    currentUser,
  }
  return { ...actions, ...values }
})
