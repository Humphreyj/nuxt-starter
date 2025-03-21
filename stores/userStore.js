import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref({
    id: '87b27c0f-a177-4cc9-a926-48d170cc9f30',
    username: 'Ima Playit',
    profileImage: 'img/users/imaPlayit.jpeg',
    role: 'user',
  })

  const actions = {}
  const values = {
    currentUser,
  }
  return { ...actions, ...values }
})
