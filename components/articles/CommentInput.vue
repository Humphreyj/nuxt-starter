<script setup>
// Components

const { currentUser } = storeToRefs(useUserStore())

const comment = ref('')
const emit = defineEmits(['add-new-comment'])
const handleNewComment = () => {
  emit('add-new-comment', comment.value)
  comment.value = ''
}
const verificationSent = ref(false)
const resendVerification = async () => {
  // Logic to resend email verification

  $fetch('/api/users/resend-verification', {
    method: 'POST',
    body: {
      email: currentUser.value.email,
      verificationToken: currentUser.value.verificationToken,
    },
  })
  verificationSent.value = true
}
</script>

<template>
  <form
    class="flex-col-is-js w-full gap-2 border border-gray-500/50 p-2 rounded relative"
  >
    <div class="flex-ic-js gap-2">
      <UAvatar
        v-if="currentUser.avatarUrl"
        :src="currentUser.avatarUrl"
        class="border"
      />
      <UAvatar
        v-else
        icon="lucide:user"
        class="text-2xl text-primary-text rounded-full border"
      />
      <p class="font-semibold">{{ currentUser.displayName }}</p>
    </div>
    <div v-if="currentUser.emailVerified" class="w-full">
      <UInput
        v-model="comment"
        type="text"
        placeholder="Add a comment..."
        class="w-full my-2"
        size="xl"
        color="neutral"
        @keydown.enter.prevent="handleNewComment"
      />
      <div class="w-full flex-ic-jend">
        <UButton
          class="w-max text-xs"
          color="primary"
          @click.prevent="handleNewComment"
        >
          Send
        </UButton>
      </div>
    </div>
    <div v-else>
      <div v-if="!verificationSent">
        <p class="text-sm text-gray-500/80">Verify your email to comment.</p>
        <UButton
          class="w-max text-xs"
          color="primary"
          @click.prevent="resendVerification"
        >
          Resend Verification
        </UButton>
      </div>
      <p class="text-gray-500/80">Check your email and do what it says.</p>
    </div>
  </form>
</template>
