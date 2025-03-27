<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
// Pinia

import { handleFormat } from '#imports'
const route = useRoute()
import { useUserStore } from '#imports'
const { currentUser } = storeToRefs(useUserStore())

const { data: user } = await useFetch(`/api/users/${route.params.id}`, {
  method: 'GET',
  params: { id: route.params.id },
})
</script>

<template>
  <main>
    <h2 class="text-3xl text-center font-bold">Profile</h2>
    <div v-if="currentUser" class="w-8/12 mx-auto rounded-lg flex-col-ic-jc">
      <div
        class="mt-4 p-4 bg-header w-full rounded-lg shadow-md flex-col-ic-jc gap-2"
      >
        <UAvatar
          v-if="currentUser.avatarUrl"
          class="border"
          :src="currentUser.avatarUrl"
        />
        <UAvatar
          v-else
          icon="lucide:user"
          class="text-4xl text-primary-text size-12 rounded-full border"
        />
        <p class="text-2xl font-bold">{{ currentUser.displayName }}</p>
        <p v-if="user" class="text-sm text-gray-400">
          Member Since: {{ handleFormat(user.createdAt, 'date') }}
        </p>

        <div class="flex-ic-jc gap-2">
          <UIcon
            v-if="currentUser && currentUser.emailVerified"
            name="lucide:thumbs-up"
            class="text-blue-500 mb-1 text-lg drop-shadow-lg shadow shadow-neutral-900"
          />
          <p>15 Likes Received</p>
        </div>
      </div>
    </div>
  </main>
</template>
