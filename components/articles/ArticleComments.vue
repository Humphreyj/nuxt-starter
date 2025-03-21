<script setup>
// Components
const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
})
const { data: comments } = await useFetch(`/api/comments/${props.articleId}`)
const articleComments = ref(comments || [])
const newComment = ref('')

const addNewComment = () => {
  if (newComment.value.trim() === '') return
  // Here you would typically send the new comment to your API
  // For now, we'll just add it to the local state
  articleComments.value.unshift({
    id: Date.now(), // Simulate a unique ID for the new comment
    content: newComment.value,
  })
  newComment.value = '' // Clear the input after adding the comment
}

// const emit = defineEmits()
</script>

<template>
  <section class="flex-col-is-js w-full">
    <div class="w-full h-[2px] bg-gray-500/80 my-2"></div>
    <h1 class="text-xl font-semibold">Comments</h1>
    <p class="text-sm">Be civil to ensure we all have a Damn Good discussion</p>
    <div class="flex-col-is-js w-full gap-2">
      <UInput
        v-model="newComment"
        type="text"
        placeholder="Add a comment..."
        class="w-full"
        size="xl"
        @keydown.enter="addNewComment"
      />
      <div
        v-for="comment in articleComments"
        :key="comment.id"
        class="flex-col-is-js border-b border-gray-500/80 w-full"
      >
        <div id="comment-author" class="flex-ic-js gap-3 my-1">
          <div class="size-8 bg-gray-400 rounded-full"></div>
          <p>Username</p>
        </div>
        <p class="mb-2">
          {{ comment.content }}
        </p>
      </div>
    </div>
  </section>
</template>
