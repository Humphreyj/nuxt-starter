import { defineStore } from 'pinia'

export const useUiStore = defineStore('uiStore', () => {
  const showLoginModal = ref(false)
  const showSidebar = ref(false)
  const showProfileSlideover = ref(false)

  const toggleLoginModal = () => {
    showLoginModal.value = !showLoginModal.value
  }
  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
  }
  const toggleProfileSlideover = () => {
    showProfileSlideover.value = !showProfileSlideover.value
  }

  const actions = {
    toggleLoginModal,
    toggleSidebar,
    toggleProfileSlideover,
  }
  const values = {
    showSidebar,
    showLoginModal,
    showProfileSlideover,
  }
  return { ...actions, ...values }
})
