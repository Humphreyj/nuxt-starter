<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
import { useUserStore } from '#imports'

const credentials = reactive({
  email: '',
  password: '',
  displayName: null,
})
const showLogin = ref(true)

const onSubmit = async (event) => {
  event.preventDefault()
  credentials.email = credentials.email.trim().toLowerCase()
  const { login } = useUserStore()
  try {
    await login(credentials)
    // redirect to home
    window.location.href = '/'
  } catch (error) {
    // Handle login error, e.g., show error message
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="flex-col-ic-jc p-3 w-full">
    <p>Your email is verified!</p>
    <p>Sign in to get started.</p>
    <UForm
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
        <span @click="showLogin = false" class="text-blue-500 cursor-pointer"
          >Signup</span
        >
      </p>
    </UForm>
  </div>
</template>
