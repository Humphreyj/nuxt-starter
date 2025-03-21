<script setup>
// Components
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
// const emit = defineEmits()
</script>

<template>
  <div class="flex-col-is-js border-b border-gray-500/80 w-full px-1">
    <div id="comment-author" class="flex-ic-js gap-3 my-1">
      <UAvatar :src="comment.user.profileImage" />
      <p class="font-semibold">{{ comment.user.username }}</p>
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
        <UAvatar :src="reply.user.profileImage" />
        <p class="font-semibold">{{ reply.user.username }}</p>
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
