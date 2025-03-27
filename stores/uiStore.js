import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const showSidebar = ref(false)

  const actions = {
    login,
    logout,
    checkForUser,
    setCurrentUser,
    signup,
  }
  const values = {
    showSidebar,
  }
  return { ...actions, ...values }
})
