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
  const { login } = useUserStore()
  try {
    await login(credentials)
    // Handle successful login, e.g., close modal or redirect
  } catch (error) {
    // Handle login error, e.g., show error message
    console.error('Login failed:', error)
  }
}

const onSignup = async (event) => {
  event.preventDefault()
  const { signup } = useUserStore()
  try {
    await signup(credentials)
    // Handle successful signup, e.g., close modal or redirect
  } catch (error) {
    // Handle signup error, e.g., show error message
    console.error('Signup failed:', error)
  }
}
</script>

<template>
  <UModal>
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
