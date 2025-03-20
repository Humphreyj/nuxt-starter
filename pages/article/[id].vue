<script setup>
// Components
import Article from '~/components/content/Article.vue'
// const props = defineProps({})
// const emit = defineEmits()
const { id } = useRoute().params
const { data } = await useFetch(`/api/articles/${id}`)
const article = ref(data.value || {})
const { title, summary, content, imageUrl, created_at, author, gameId } =
  article.value
// Fetch game data only after article is loaded
const game = ref({})
if (gameId) {
  const { data: gameData } = await useFetch(`/api/games/${gameId}`)
  game.value = gameData.value || {}
}
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('articles').first()
})
</script>

<template>
  <article class="flex-col-is-js w-full md:w-1/2 mx-auto">
    <Article />
    <NuxtLink
      :to="{
        name: 'games-id',
        params: { id: game.id },
      }"
    >
      <h2 class="font-emibold underline pl-2 text-white text-center my-1">
        {{ game.title }}
      </h2>
    </NuxtLink>

    <div class="w-full">
      <NuxtImg :src="imageUrl" class="object-contain w-full h-full"></NuxtImg>
    </div>
    <div class="flex-col-is-js px-2 py-1 w-full">
      <h3 class="text-3xl font-bold text-white border-b w-full hover:underline">
        {{ title }}
      </h3>
      <p class="row-start-3 w-[98%] min-h-16">
        {{ summary }}
      </p>
      <AuthorComponent
        :author="author"
        :created_at="created_at"
        :article-detail="true"
      />
      <div class="w-full h-[2px] bg-gray-500/80 my-2"></div>
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>
