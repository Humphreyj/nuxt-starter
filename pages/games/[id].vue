<script setup>
// Components
import GameTag from '~/components/games/GameTag.vue'
import ScreenshotCarousel from '~/components/games/ScreenshotCarousel.vue'
// Utils
import { handleFormat } from '#imports'
// const props = defineProps({})
// const emit = defineEmits()
const { id } = useRoute().params
const { data } = await useFetch(`/api/games/${id}`)
const game = ref(data.value || {})
const { title, tags, release_date, price, purchase_price, review, images } =
  game.value

const showScreenshotsCarousel = ref(false)
const toggleScreenshotsCarousel = () => {
  showScreenshotsCarousel.value = !showScreenshotsCarousel.value
}
const openScreenshotsCarousel = (index) => {}
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
]
</script>

<template>
  <main class="flex-col-is-js w-11/12 h-screen md:w-1/3 mx-auto py-4">
    <div class="w-full">
      <NuxtImg
        :src="images.cover"
        alt="Game Image"
        class="w-full h-full rounded-t-sm"
      />
    </div>
    <div class="flex-ic-je gap-2 w-full my-1">
      <NuxtImg
        v-for="(screenshot, i) in images.screenshots"
        :key="i"
        :src="screenshot"
        alt="Game Image"
        class="w-32 h-24 md:w-48 md:h-32 object-cover overflow-hidden"
        @click="toggleScreenshotsCarousel"
      />
      <UModal
        v-model:open="showScreenshotsCarousel"
        :title="title"
        class="w-full"
      >
        <template #body>
          <ScreenshotCarousel
            v-if="images.screenshots.length"
            :items="images.screenshots"
            class="w-full mx-auto"
          />
        </template>
      </UModal>
    </div>

    <section class="w-full">
      <div
        id="game-info"
        class="w-full flex flex-col p-2 items-start justify-start gap-1 relative border"
      >
        <h3 class="font-bold text-xl">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-400">Price: {{ price }}</p>
        <p class="text-sm text-gray-400">
          Purchase Price: {{ purchase_price }}
        </p>
        <p class="text-sm text-gray-400">
          Released: {{ handleFormat(release_date, 'date') }}
        </p>
        <div class="flex-ic-js gap-1">
          <GameTag v-for="(tag, i) in tags" :key="i" :tag="tag" />
        </div>
      </div>
    </section>
    <section id="review">{{ review }}</section>
  </main>
</template>
