import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref(null)

  const selectedUser = ref(null) // For selecting a user in UI, e.g., for admin actions

  const checkForUser = () => {
    const { user } = useUserSession()
    if (user.value) {
      currentUser.value = user.value
    }
  }

  const getUserById = async (userId) => {
    if (!userId) {
      return null
    }
    try {
      const user = await $fetch(`/api/users/${userId}`)
      currentUser.value = user
      return user
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      return null
    }
  }

  const refreshUserData = async () => {
    if (currentUser.value?.id) {
      return await getUserById(currentUser.value.id)
    }
    return null
  }

  const setCurrentUser = (user) => {
    currentUser.value = user
  }
  const setSelectedUser = (user) => {
    const { showProfileSlideover } = storeToRefs(useUiStore())
    if (!user) {
      selectedUser.value = null
      return
    }
    if (currentUser.value && currentUser.value.id === user.id) {
      // Don't set the selected user if it's the same as the current user
      // This avoids unnecessary UI updates
      return
    }
    // Ensure we set the selected user correctly
    selectedUser.value = user
    showProfileSlideover.value = true // Automatically show the profile slideover when a user is selected
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
    clear()
    currentUser.value = null
    toast.add({
      color: 'green',
      title: 'User logged out successfully',
    })
  }

  const signup = async (newUser) => {
    // const hashedPassword = await hashPassword(newUser.password)
    toast.add({
      color: 'green',
      title: 'Creating user...',
    })
    const user = await $fetch('/api/users/create', {
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
    if (user) {
      toast.add({
        color: 'green',
        title: `Success! Verify your email to complete the signup.`,
      })
      // currentUser.value = result.user
      setCurrentUser(user)
    }
  }

  const actions = {
    login,
    logout,
    checkForUser,
    setCurrentUser,
    setSelectedUser, // For setting the selected user in UI
    refreshUserData,
    signup,
    getUserById,
  }
  const values = {
    currentUser,
    selectedUser,
  }
  return { ...actions, ...values }
})
