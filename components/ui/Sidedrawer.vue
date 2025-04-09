<script setup>
// Components

// Pinia
import { useUserStore } from '#imports'
import { useUiStore } from '#imports'

const props = defineProps({
  showSidebar: {
    type: Boolean,
    default: false,
  },
})
const { currentUser } = storeToRefs(useUserStore())
const { toggleLoginModal } = useUiStore()
const { logout, checkForUser, getUserById } = useUserStore()
const emit = defineEmits(['toggle'])
const open = ref(props.showSidebar)
const toggle = () => {
  open.value = !open.value
  emit('toggle', open.value)
}
// let verificationInterval
// const checkVerification = async () => {
//   if (!currentUser.value) {
//     clearInterval(verificationInterval)
//     return
//   }
//   await getUserById(currentUser?.value?.id)
//   if (currentUser.value.emailVerified) {
//     clearInterval(verificationInterval)
//     window.location.reload() // Refresh page
//   }
//   return
// }

onMounted(() => {
  checkForUser()
})
// watchEffect(() => {
//   if (!currentUser?.value?.emailVerified) {
//     verificationInterval = setInterval(checkVerification, 30000) // Check every 30 seconds
//   } else {
//     clearInterval(verificationInterval)
//   }
// })
// onUnmounted(() => {
//   if (verificationInterval) {
//     clearInterval(verificationInterval)
//   }
// })
</script>

<template>
  <UDrawer v-model:open="open" direction="left">
    <UButton
      color="neutral"
      variant="subtle"
      trailing-icon="lucide:align-justify"
    />

    <template #content>
      <section
        class="w-full min-w-[300px] h-full flex-col-is-js py-2 px-4 pb-12"
      >
        <NuxtImg
          src="https://i.postimg.cc/c4GngCHH/DGGLogo.png"
          alt="Damn Good Logo"
          class="w-24"
        />
        <nav class="py-4">
          <ul
            class="flex-col-is-js gap-4 text-primary-text text-lg font-semibold pl-2"
          >
            <li>
              <nuxt-link to="/" @click="toggle">
                <div class="flex-ic-js gap-2">
                  <UIcon
                    name="lucide:home"
                    class="text-2xl text-primary-text"
                  />
                  <span class="">Home</span>
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/games" @click="toggle">
                <div class="flex-ic-js gap-2">
                  <UIcon
                    name="lucide:gamepad-2"
                    class="text-2xl text-primary-text"
                  />
                  <span class="">Games</span>
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about" @click="toggle">
                <div class="flex-ic-js gap-2">
                  <UIcon
                    name="lucide:ghost"
                    class="text-2xl text-primary-text"
                  />
                  <span class="">About</span>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <section v-if="currentUser" class="flex-col-is-js gap-2 pl-2">
          <div class="flex-ic-js gap-2">
            <NuxtLink
              :to="`/profile/${currentUser.id}`"
              class="flex-ic-js gap-2"
              @click="toggle"
            >
              <UAvatar
                v-if="currentUser.avatarUrl"
                :src="currentUser.avatarUrl"
              />
              <UIcon
                v-else
                name="lucide:user"
                class="text-2xl text-primary-text"
              />
            </NuxtLink>
            <span class="text-lg font-semibold">
              {{ currentUser.displayName }}
            </span>
          </div>
          <UButton class="text-xs" @click="logout">Logout</UButton>
        </section>
        <section v-else>
          <UButton class="text-xs" @click="toggleLoginModal">Login</UButton>
        </section>
      </section>
    </template>
  </UDrawer>
</template>
