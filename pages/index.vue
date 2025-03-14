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
      <h2 class="font-bold text-2xl">Recent Posts</h2>
      <GameCard v-for="game in gamesList" :key="game.id" :game="game" />
    </section>
  </div>
</template>
