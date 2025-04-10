<script setup>
// Components
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['toggle-reply'])
const { currentUser } = storeToRefs(useUserStore())
const { setSelectedUser } = useUserStore()

const comment = ref(props.comment)
const handleLike = async () => {
  let newComment
  if (currentUser.value.id === comment.value.userId) {
    return
  }
  // Check if the user has already liked the comment
  let foundUserIndex = comment.value.likes.findIndex(
    (user) => user.userId === currentUser.value.id,
  )
  // If the user has already liked the comment, remove their like
  if (foundUserIndex !== -1) {
    comment.value.likes.splice(foundUserIndex, 1)
    newComment = await $fetch('/api/comments/' + comment.value.id + '/like', {
      method: 'DELETE',
      body: {
        userId: currentUser.value.id,
        commentId: comment.value.id,
        receiverId: comment.value.userId, // Optional: if you want to notify the comment owner
        displayName: currentUser.value.displayName,
      },
    })
    comment.value = newComment
  } else {
    comment.value.likes.push(currentUser.value)
    newComment = await $fetch('/api/comments/' + comment.value.id + '/like', {
      method: 'POST',
      body: {
        userId: currentUser.value.id,
        commentId: comment.value.id,
        receiverId: comment.value.userId,
        displayName: currentUser.value.displayName,
      },
    })
    comment.value = newComment
  }

  // Update the comment with the new likes
}

const likeButtonClass = computed(() => {
  let foundLike = comment.value.likes.findIndex(
    (user) => user.userId === currentUser.value.id,
  )
  if (foundLike !== -1) {
    return 'text-blue-500 mb-1 text-lg cursor-pointer -rotate-6 transition duration-200 ease-in-out drop-shadow-lg shadow shadow-neutral-900'
  } else {
    return 'text-gray-500 mb-1 text-lg cursor-pointer transition duration-200 ease-in-out'
  }
})
const showLikesPopover = ref(false)
// const emit = defineEmits()
const handleUserSelect = (user) => {
  if (currentUser.value && currentUser.value.id === user.id) {
    // Don't set the selected user if it's the current user
    return
  }
  setSelectedUser(user) // This will set the selected user in the store
}
</script>

<template>
  <div class="flex-col-is-js w-full p-1">
    <div
      id="comment-author"
      class="flex-ic-js gap-3 my-1"
      @click="handleUserSelect(comment.userData)"
    >
      <UAvatar
        v-if="comment.userData.avatarUrl"
        :src="comment.userData.avatarUrl"
        class="border"
      />
      <UAvatar
        v-else
        icon="lucide:user"
        class="text-2xl text-primary-text rounded-full border"
      />
      <p class="font-semibold">{{ comment.userData.displayName }}</p>
      <p class="text-sm">{{ handleFormat(comment.createdAt, 'date') }}</p>
    </div>
    <p class="mb-2">
      {{ comment.content }}
    </p>
    <div id="comment-actions" class="flex-ic-js gap-3 p-1">
      <!-- <p class="text-sm" @click="emit('toggle-reply')">Reply</p> -->
      <UIcon
        v-if="currentUser && currentUser.emailVerified"
        name="lucide:thumbs-up"
        :class="likeButtonClass"
        @click="handleLike"
      />
      <UPopover v-model:open="showLikesPopover" v-if="comment.likes.length">
        <p class="text-sm" @click="() => (showLikesPopover = true)">
          {{ comment.likes.length }}
        </p>
        <template #content>
          <div class="flex-col-is-js p-2">
            Liked By:
            <p v-for="(like, i) in comment.likes" :key="i">
              {{ like.displayName }}
            </p>
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
