<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
import { useUserStore } from '#imports'
import { useUiStore } from '#imports'

const credentials = reactive({
  email: '',
  password: '',
  displayName: null,
})
const showLogin = ref(true)
const { showLoginModal } = storeToRefs(useUiStore())

const onSubmit = async (event) => {
  event.preventDefault()
  credentials.email = credentials.email.trim().toLowerCase()
  const { login } = useUserStore()
  try {
    await login(credentials)
    showLoginModal.value = false // Close the modal on successful login
    credentials.email = ''
    credentials.password = ''
    credentials.displayName = null // Reset displayName for signup

    // Handle successful login, e.g., close modal or redirect
  } catch (error) {
    // Handle login error, e.g., show error message
    console.error('Login failed:', error)
  }
}

const onSignup = async (event) => {
  event.preventDefault()
  const { signup } = useUserStore()
  credentials.email = credentials.email.trim().toLowerCase()
  try {
    await signup(credentials)
    showLoginModal.value = false // Close the modal on successful login
    credentials.email = ''
    credentials.password = ''
    credentials.displayName = null // Reset displayName for signup

    // Handle successful signup, e.g., close modal or redirect
  } catch (error) {
    // Handle signup error, e.g., show error message
    console.error('Signup failed:', error)
  }
}

const googleSignIn = async () => {
  $fetch('/api/auth/google/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('google', response)
        // Handle successful Google sign-in, e.g., close modal or redirect
      } else {
        // Handle error
        console.error('Google sign-in failed:', response.statusText)
      }
    })
    .catch((error) => {
      console.error('Error during Google sign-in:', error)
    })
}
</script>

<template>
  <UModal
    v-model:open="showLoginModal"
    :close-on-esc="true"
    :close-on-backdrop="true"
    class="w-full max-w-md"
  >
    <UButton label="Login" color="neutral" variant="subtle" />

    <template #content>
      <div class="flex-col-ic-jc p-3 w-full">
        <UForm
          v-if="showLogin"
          :state="credentials"
          class="flex-col-ic-jc gap-4 w-full"
          @submit="onSubmit"
        >
          <h1 class="text-2xl font-semibold">Login</h1>
          <UFormField label="Email" name="email">
            <UInput v-model="credentials.email" />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput v-model="credentials.password" type="password" />
          </UFormField>

          <UButton type="submit"> Submit </UButton>
          <p class="text-sm">
            Don't have an account?
            <span
              @click="showLogin = false"
              class="text-blue-500 cursor-pointer"
              >Signup</span
            >
          </p>
        </UForm>

        <UForm
          v-else
          :state="credentials"
          class="flex-col-ic-jc gap-4 w-full"
          @submit="onSignup"
        >
          <h1 class="text-2xl font-semibold">Signup</h1>
          <UFormField label="Email" name="email">
            <UInput v-model="credentials.email" />
          </UFormField>

          <UFormField label="Display Name" name="displayName">
            <UInput v-model="credentials.displayName" type="text" />
          </UFormField>
          <UFormField label="Password" name="password">
            <UInput v-model="credentials.password" type="password" />
          </UFormField>

          <UButton type="submit"> Submit </UButton>
          <UButton @click.prevent="googleSignIn" type="submit">
            Google
          </UButton>
          <p class="text-sm">
            Already have an account?
            <span @click="showLogin = true" class="text-blue-500 cursor-pointer"
              >Login</span
            >
          </p>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
