<script setup>
// Components

// Pinia
import { useUserStore, useUiStore } from '#imports'
// Utils
import { handleFormat } from '#imports'

// Create formatter (English).

const { selectedUser } = storeToRefs(useUserStore())
const { showProfileSlideover } = storeToRefs(useUiStore())

const { data: user } = await useFetch(`/api/users/${selectedUser.value.id}`, {
  method: 'GET',
  params: { id: selectedUser.value.id },
})
</script>

<template>
  <USlideover
    v-model:open="showProfileSlideover"
    side="bottom"
    :close="{ onClick: () => selectedUser = null }"
    class="h-[70vh]"
"
  >
    <template #body>
      <div
        v-if="user"
        class="w-full md:w-8/12 h-[70vh] mx-auto rounded-lg flex-col-is-js"
      >
        <div
          class="mt-4 p-4 bg-header w-full rounded-lg shadow-md flex-col-ic-jc gap-2"
        >
          <UAvatar v-if="user.avatarUrl" class="border" :src="user.avatarUrl" />
          <UAvatar
            v-else
            icon="lucide:user"
            class="text-4xl text-primary-text size-12 rounded-full border"
          />
          <p class="text-2xl font-bold">{{ user.displayName }}</p>
          <p v-if="user" class="text-sm text-gray-400">
            Member Since: {{ handleFormat(user.createdAt, 'date') }}
          </p>

          <div class="flex-ic-jc gap-2">
            <UIcon
              v-if="user && user.emailVerified"
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
    </template>
  </USlideover>
</template>
