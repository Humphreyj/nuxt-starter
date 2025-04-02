<script setup>
// Components
import CommentInput from './CommentInput.vue'
import CommentBox from './CommentBox.vue'
// Pinia
import { useUserStore } from '#imports'
import { useUiStore } from '#imports'

const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
  articleTitle: {
    type: String,
    required: true,
  },
  articleSlug: {
    type: String,
    required: true,
  },
})

const { currentUser } = storeToRefs(useUserStore())
const { toggleLoginModal } = useUiStore()
const { data: comments } = await useFetch(`/api/comments/${props.articleId}`)
const articleComments = ref(comments || [])
// const newComment = ref('')

const addNewComment = async (comment) => {
  if (comment.trim() === '') return
  // Here you would typically send the new comment to your API
  // For now, we'll just add it to the local state
  let user = { ...currentUser.value } // Ensure we have the current user
  delete user.role
  articleComments.value.unshift({
    id: Date.now(), // Simulate a unique ID for the new comment
    content: comment,
    userData: user,
    createdAt: new Date().toISOString(),
    likes: [],
  })
  await $fetch('/api/comments/:articleId', {
    method: 'POST',
    body: {
      articleId: props.articleId,
      articleTitle: props.articleTitle,
      articleSlug: props.articleSlug,
      content: comment,
      userData: user,
      likes: [],
    },
  })
}

// const emit = defineEmits()
</script>

<template>
  <section id="article-comments" class="flex-col-is-js w-11/12 mx-auto gap-1">
    <h1 class="text-2xl font-semibold">Comments</h1>
    <p class="text-sm my-1">
      Be civil to ensure we all have a Damn Good discussion
    </p>
    <CommentInput v-if="currentUser" @add-new-comment="addNewComment" />
    <div
      v-else
      class="w-11/12 mx-auto standard-border rounded-lg p-4 flex-col-is-js gap-2"
    >
      <p>Log in to comment.</p>
      <UButton class="text-xs" @click="toggleLoginModal">Login</UButton>
    </div>
    <p
      v-if="!articleComments.length"
      class="text-center w-full mt-4 text-xl text-gray-500/80"
    >
      No comments yet. Be the first!
    </p>
    <CommentBox
      v-for="comment in articleComments"
      :key="comment.id"
      :comment="comment"
      class="flex-col-is-js w-full px-1 mt-1"
    />
  </section>
</template>
