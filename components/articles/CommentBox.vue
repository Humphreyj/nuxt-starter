<script setup>
// Components
import Comment from './Comment.vue'
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
const { currentUser } = storeToRefs(useUserStore())
const { comment } = toRefs(props)
const showReplyInput = ref(false)
const newReply = ref('')
const toggleReplyInput = () => {
  showReplyInput.value = !showReplyInput.value
}
const handleReply = () => {
  let data = {
    articleId: comment.value.articleId,
    parentId: comment.value.id,
    content: newReply.value,
    userData: { ...currentUser.value },
    createdAt: new Date().toISOString(),
    likes: [],
    replies: [],
  }
  comment.value.replies.push(data)
  showReplyInput.value = false
  console.log('data', data)
}
</script>

<template>
  <div class="flex-col-is-js border-b border-gray-500/80 w-full px-1">
    <Comment
      :id="comment.id"
      :comment="comment"
      @toggle-reply="toggleReplyInput"
    />
    <UInput
      v-if="showReplyInput"
      v-model="newReply"
      type="text"
      placeholder="Add a reply..."
      class="w-full"
      size="xl"
      color="neutral"
      @keydown.enter="handleReply"
    />
    <div class="flex-col-is-js w-full pl-2 px-1">
      <Comment
        v-if="comment.replies?.length"
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        @toggle-reply="toggleReplyInput"
      />
    </div>
  </div>
</template>
