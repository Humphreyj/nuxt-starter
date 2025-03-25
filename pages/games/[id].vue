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
const route = useRoute()
const game = ref(data.value || {})
const { title, tags, release_date, price, platform, description, images } =
  game.value

const { data: gameArticles } = await useAsyncData(route.path, () => {
  return queryCollection('articles').where('gameId', '=', id).all()
})

const showScreenshotsCarousel = ref(false)
const toggleScreenshotsCarousel = () => {
  showScreenshotsCarousel.value = !showScreenshotsCarousel.value
}
</script>

<template>
  <main class="flex-col-is-js w-11/12 h-screen md:w-[40%] mx-auto py-4">
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
        class="w-full h-[50vh]"
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
        <p class="text-sm text-gray-400">Platform: {{ platform }}</p>
        <p class="text-sm text-gray-400">
          Released: {{ handleFormat(release_date, 'date') }}
        </p>
        <div class="flex-ic-js gap-1">
          <GameTag v-for="(tag, i) in tags" :key="i" :tag="tag" />
        </div>
      </div>
    </section>
    <section id="review" class="flex-col-is-js w-full">
      <p class="my-2">{{ description }}</p>
      <h3 class="font-bold text-xl">Articles</h3>
      <div
        v-for="(article, i) in gameArticles"
        :key="i"
        class="w-full border flex-ic-jb p-2"
      >
        <p class="text-sm">{{ article.title }}</p>
        <NuxtLink
          :to="{
            name: 'article-slug',
            params: { slug: article.slug },
          }"
        >
          <UIcon
            name="lucide:chevrons-right"
            class="text-gray-400 size-6 translate-y-1"
          />
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
