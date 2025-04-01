import { defineStore } from 'pinia'

export const useUiStore = defineStore('uiStore', () => {
  const showLoginModal = ref(false)
  const showSidebar = ref(false)

  const toggleLoginModal = () => {
    showLoginModal.value = !showLoginModal.value
  }

  const actions = {
    toggleLoginModal,
  }
  const values = {
    showSidebar,
    showLoginModal,
  }
  return { ...actions, ...values }
})
