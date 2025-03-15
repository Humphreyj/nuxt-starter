<script setup>
import GameCard from '~/components/games/GameCard.vue'

// Components
// const props = defineProps({})
// const emit = defineEmits()

const { data } = await useFetch('/api/games/getGames')
const gamesList = ref(data.value.games || [])
</script>

<template>
  <div
    class="h-full w-full md:w-1/3 mx-auto flex flex-col gap-4 items-start justify-start px-4 pb-12"
  >
    <div
      class="w-max mx-auto border-b-2 p-2 rounded-md my-4 border-gray-900 bg-headerBg flex-col-ic-jc px-2 py-1"
    >
      <h1 class="font-bold text-3xl tracking-wider">Damn Good Games</h1>
      <p class="text-sm">No bullshit reviews and news.</p>
      <p class="text-[8px]">Some bullshit opinions.</p>
    </div>
    <section class="flex-col-ic-jc gap-2 w-full">
      <div class="w-full flex flex-ic-js gap-2">
        <div class="size-6 rounded-sm bg-[#B41D2F] bg-opacity-60"></div>
        <h2 class="text-2xl font-bold">Featured</h2>
      </div>
      <FeaturedItem />
    </section>
    <section class="flex-col-ic-jc gap-2 w-full">
      <div class="w-full flex flex-ic-js gap-2">
        <div class="size-6 rounded-sm bg-[#B41D2F] bg-opacity-60"></div>
        <h2 class="text-2xl font-bold">Recent</h2>
      </div>
      <FeaturedItem />
    </section>
  </div>
</template>
