<script setup>
// Components
const props = defineProps({
  feature: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      title: 'The perks of the simple life',
      summary: 'Play trucks with your homies.',
      imageUrl:
        'https://cdn1.epicgames.com/spt-assets/a09a1e719daa45c992dee7dd284ed51f/roadcraft-1atx7.jpg',
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
const { title, summary, imageUrl, author, created_at } = props.feature
</script>

<template>
  <div class="@container w-full flex-col-is-js">
    <div class="w-full">
      <NuxtImg :src="imageUrl" class="object-contain w-full h-full"></NuxtImg>
    </div>
    <div
      id="article-info"
      class="grid grid-cols-1 grid-rows-[auto_1fr_auto_auto] bg-header px-1 py-2 w-full"
    >
      <div class="row-span-2 grid grid-rows-subgrid">
        <p class="row-start-2 w-11/12 min-h-16">
          {{ summary }}
        </p>
      </div>
      <div class="flex-ic-js gap-2 mt-2">
        <div class="size-10 rounded-full bg-gray-500">
          <NuxtImg
            :src="author.imageUrl"
            alt="Author Image"
            class="w-full h-full object-cover object-center border border-gray-400 rounded-full"
          />
        </div>
        <div class="flex-col-is-js">
          <p class="text-sm text-white">{{ author.name }}</p>
          <p class="text-xs text-gray-300">
            {{ handleFormat(created_at, 'date') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
