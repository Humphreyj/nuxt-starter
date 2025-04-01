<script lang="js" setup>
import { useUiStore } from '#imports'
import LoginModal from './components/auth/LoginModal.vue'
const { showLoginModal } = storeToRefs(useUiStore())
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <div class="w-full">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <LoginModal v-if="showLoginModal" />
  </UApp>
</template>
