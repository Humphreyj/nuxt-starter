<script setup>
// Components
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
const { currentUser } = storeToRefs(useUserStore())

const { comment } = toRefs(props)

const handleLike = async () => {
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
  <div class="flex-col-is-js border-b border-gray-500/80 w-full px-1">
    <div id="comment-author" class="flex-ic-js gap-3 my-1">
      <UAvatar :src="comment.userData.avatarUrl" />
      <p class="font-semibold">{{ comment.userData.displayName }}</p>
      <p class="text-sm">{{ handleFormat(comment.createdAt, 'date') }}</p>
    </div>
    <p class="mb-2">
      {{ comment.content }}
    </p>
    <div id="comment-actions" class="flex-ic-js gap-2 p-1">
      <p class="text-sm">Reply</p>
      <UIcon
        name="lucide:thumbs-up"
        class="text-gray-500 mb-1 cursor-pointer"
        @click="handleLike"
      />
      <p class="text-sm">{{ comment.likes.length }}</p>
    </div>
    <div
      v-if="comment.replies.length"
      v-for="reply in comment.replies"
      :key="reply.id"
      class="flex-col-is-js w-10/12 px-1 ml-2"
    >
      <div id="reply-author" class="flex-ic-js gap-3 my-1">
        <UAvatar :src="reply.user.avatarUrl" />
        <p class="font-semibold">{{ reply.user.displayName }}</p>
        <p class="text-sm">{{ handleFormat(reply.createdAt, 'date') }}</p>
      </div>
      <p class="mb-2">
        {{ reply.content }}
      </p>
      <div id="reply-actions" class="flex-ic-js gap-2 p-1">
        <p class="text-sm">Reply</p>
        <UIcon
          name="lucide:thumbs-up"
          class="text-gray-500 mb-1 cursor-pointer"
        />
        <p class="text-sm">{{ reply.likes.length }}</p>
      </div>
    </div>
  </div>
</template>
