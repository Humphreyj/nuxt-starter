<script setup>
// Components
const props = defineProps({
  article: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      title: 'Literally a sandbox',
      summary: 'Play trucks with your homies.',
      imageUrl: 'https://i.postimg.cc/fRwwrnrK/roadcraft-Cover.jpg',
      created_at: '2023-10-17T00:00:00.000Z',
      author: {
        id: 0,
        name: 'Dan Good',
        imageUrl: 'https://i.postimg.cc/fTxRWHsP/Capture-2025-03-15-152344.png',
      },
    }),
  },
})
// const emit = defineEmits()
const { title, summary, imageUrl, author, created_at } = props.article
</script>

<template>
  <div
    class="w-full bg-gray-400 flex-col-is-js border-2 rounded-sm border-gray-500/80"
  >
    <div class="w-full">
      <NuxtImg :src="imageUrl" class="object-contain w-full h-full"></NuxtImg>
    </div>
    <div
      id="article-info"
      class="grid grid-cols-1 grid-rows-[auto_auto_1fr_auto_auto] bg-header px-1 py-2 w-full"
    >
      <NuxtLink
        :to="{
          name: 'article-id',
          params: { id: props.article.id },
        }"
      >
        <h3 class="text-xl font-bold text-white border-b w-max hover:underline">
          {{ title }}
        </h3>
      </NuxtLink>
      <div class="row-span-2 grid grid-rows-subgrid gap-2">
        <p class="row-start-3 w-[98%] min-h-16">
          {{ summary }}
        </p>
      </div>
      <AuthorComponent :author="author" :created_at="created_at" />
    </div>
  </div>
</template>
