<script setup>
// Components
// Composables
// import { getStyles } from '#imports';
const props = defineProps({
  game: {
    type: Object,
    default: () => ({
      id: 1,
      title: 'Game Title',
      genre: 'Game Genre',
      rating: 'Game Rating',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sint reprehenderit fuga.',
      images:
        'https://i.kinja-img.com/image/upload/c_fill,h_496,q_80,w_334/aed9f4f1887edd49c01cd84d19b849b7.jpg',
    }),
  },
})
// const emit = defineEmits()
const { title, tags, rating, description, images } = props.game
</script>

<template>
  <div
    id="game-container"
    class="border-2 border-gray-900 w-11/12 mx-auto rounded-md flex flex-col items-start justify-start"
  >
    <div id="game-image" class="w-full">
      <NuxtImg
        :src="images.cover"
        alt="Game Image"
        class="w-full h-full object-cover overflow-hidden rounded-t-sm"
      />
    </div>
    <div
      id="game-info"
      class="w-full h-48 flex flex-col px-2 items-start justify-start gap-1 relative"
    >
      <h3 class="font-bold text-xl">
        {{ title }}
      </h3>
      <div class="flex-ic-js gap-1">
        <p v-for="(tag, i) in tags" :key="i" class="border rounded-md">
          {{ tag }}
        </p>
      </div>

      <p class="mt-2">
        {{ description }}
      </p>

      <NuxtLink
        :to="{
          name: 'games-id',
          params: { id: props.game.id },
        }"
        class="absolute top-0 left-0 w-full h-full"
      >
        <button
          class="bg-blue-500 text-white text-sm px-1 py-1 rounded absolute bottom-1"
        >
          Read More
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
