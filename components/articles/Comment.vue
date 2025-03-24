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

const { comment } = toRefs(props)

const handleLike = async () => {
  if (currentUser.value.id === comment.value.userId) {
    return
  }
  // Check if the user has already liked the comment
  let foundUserIndex = comment.value.likes.findIndex(
    (user) => user.id === currentUser.value.id,
  )
  // If the user has already liked the comment, remove their like
  if (foundUserIndex !== -1) {
    comment.value.likes.splice(foundUserIndex, 1)
  } else {
    comment.value.likes.push(currentUser.value)
  }
  // put request to update comments
  const newComment = await $fetch(
    '/api/comments/' + comment.value.id + '/like',
    {
      method: 'PUT',
      body: {
        comment: comment.value,
      },
    },
  )
}

// const emit = defineEmits()
</script>

<template>
  <div class="flex-col-is-js w-full p-1">
    <div id="comment-author" class="flex-ic-js gap-3 my-1">
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
    <div id="comment-actions" class="flex-ic-js gap-2 p-1">
      <!-- <p class="text-sm" @click="emit('toggle-reply')">Reply</p> -->
      <UIcon
        name="lucide:thumbs-up"
        class="text-gray-500 mb-1 cursor-pointer"
        @click="handleLike"
      />
      <p class="text-sm">{{ comment.likes.length }}</p>
    </div>
  </div>
</template>
