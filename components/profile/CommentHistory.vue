<script setup>
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

// Components
const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
})
// const emit = defineEmits()

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')
</script>

<template>
  <div class="flex-col-is-js w-full">
    <div
      v-for="comment in props.comments"
      :key="comment.id"
      class="border-b w-full py-1"
    >
      <p class="mb-1 text-sm">
        {{ timeAgo.format(new Date(comment.createdAt)) }}
      </p>
      <p class="my-2">{{ comment.content }}</p>
      <div class="flex-ic-js gap-2">
        <NuxtImg
          :src="comment.articleImage"
          class="w-1/8 bg-gray-400 rounded-md"
        ></NuxtImg>
        <NuxtLink
          :to="{
            name: 'article-slug',
            params: { slug: comment.articleSlug },
            hash: `#${comment.id}`,
          }"
        >
          <p class="cursor-pointer">{{ comment.articleTitle }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
