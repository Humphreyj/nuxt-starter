<script setup>
import GameCard from '~/components/games/GameCard.vue'

// Components
// const props = defineProps({})
// const emit = defineEmits()

const { data } = await useFetch('/api/games/getGames')
const gamesList = ref(data.value.games || [])
</script>

<template>
  <div class="h-full w-full flex flex-col items-start justify-start">
    <section class="w-full flex flex-col items-start justify-start">
      <h2 class="font-bold text-2xl">Featured Games</h2>
      <GameCard v-for="game in gamesList" :key="game.id" :game="game" />
    </section>
    <section class="w-full flex flex-col items-start justify-start">
      <h2 class="font-bold text-2xl">New Games</h2>
    </section>
    <section class="w-full flex flex-col items-start justify-start">
      <h2 class="font-bold text-2xl">Old Games</h2>
    </section>
  </div>
</template>
