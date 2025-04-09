<script lang="js" setup>
import { useUiStore, useUserStore } from '#imports'
import LoginModal from './components/auth/LoginModal.vue'
import ProfileSlideover from './components/profile/ProfileSlideover.vue'
const { showLoginModal } = storeToRefs(useUiStore())
const toast = useToast()
const { currentUser, selectedUser } = storeToRefs(useUserStore())
const { getUserById } = useUserStore()
import { useEmailVerification } from './composables/emailVerification.js'
const handleVerificationSuccess = () => {
  toast.add({
    color: 'green',
    title: 'Your email has been verified!',
  })
  // If you need additional logic when verification completes
}

const { startPolling, stopPolling } = useEmailVerification({
  user: currentUser,
  checkUserFn: getUserById,
  onVerified: handleVerificationSuccess,
})
// Watch for changes to user verification status
watchEffect(() => {
  if (currentUser.value && !currentUser.value.emailVerified) {
    startPolling()
  } else {
    stopPolling()
  }
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <div class="w-full">
      <NuxtLayout>
        <NuxtPage />
        <ProfileSlideover v-if="selectedUser" />
      </NuxtLayout>
    </div>
    <LoginModal v-if="showLoginModal" />
  </UApp>
</template>
