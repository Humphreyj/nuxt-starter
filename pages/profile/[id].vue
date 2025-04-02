<script setup>
// Components

// Pinia
import { useUserStore } from '#imports'
// Utils
import { handleFormat } from '#imports'

// Create formatter (English).

const route = useRoute()
const { currentUser } = storeToRefs(useUserStore())

const { data: user } = await useFetch(`/api/users/${route.params.id}`, {
  method: 'GET',
  params: { id: route.params.id },
})
</script>

<template>
  <main>
    <h2 class="text-3xl text-center font-bold">Profile</h2>
    <div
      v-if="currentUser"
      class="w-11/12 md:w-8/12 mx-auto rounded-lg flex-col-ic-jc"
    >
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
          <p>{{ user.likesReceived?.length }} Likes Received</p>
        </div>
        <ProfileCommentHistory
          v-if="user.comments && user.comments.length"
          :comments="user.comments"
          class="mt-4 w-full"
        />
      </div>
    </div>
    <USkeleton v-else class="w-8/12 mx-auto rounded-lg h-48 mt-4" />
  </main>
</template>
