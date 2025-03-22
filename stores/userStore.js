import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  // const currentUser = ref({
  //   id: '87b27c0f-a177-4cc9-a926-48d170cc9f30',
  //   username: 'Ima Playit',
  //   profileImage: 'img/users/imaPlayit.jpeg',
  //   role: 'user',
  // })
  const currentUser = ref(null)
  const setCurrentUser = (user) => {
    currentUser.value = user
  }
  const toast = useToast()
  const login = async () => {
    const user = await $fetch('/api/users/login', {
      method: 'POST',
      body: {
        email: 'test@testman.com',
        password: 'securepassword',
      },
    })

    toast.add({
      color: 'green',
      title: 'User logged in successfully',
    })

    setCurrentUser(user)
  }
  const logout = () => {
    currentUser.value = null
    toast.add({
      color: 'green',
      title: 'User logged out successfully',
    })
  }

  const actions = {
    login,
    logout,
    setCurrentUser,
  }
  const values = {
    currentUser,
  }
  return { ...actions, ...values }
})
