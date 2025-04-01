<script setup>
// Components
import ArticleComments from '~/components/articles/ArticleComments.vue'
// const props = defineProps({})
// const emit = defineEmits()
const { slug } = useRoute().params
const route = useRoute()
// Fetch game data only after article is loaded
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('articles').where('slug', '=', slug).first()
})

const { title, summary, imageUrl, createdAt, author, gameId } = page.value

const game = ref({})
const { data: gameData } = await useFetch(`/api/games/${gameId}`)
game.value = gameData.value || {}
</script>

<template>
  <article class="flex-col-is-js w-full md:w-1/2 lg:w-1/3 mx-auto pb-12">
    <NuxtLink
      v-if="game.title"
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
      <NuxtImg
        v-if="imageUrl"
        :src="imageUrl"
        class="object-contain w-full h-full"
      ></NuxtImg>
      <NuxtImg
        v-else
        src="img/DGGLogo.png"
        class="bg-repeat w-full h-full"
      ></NuxtImg>
    </div>
    <div class="flex-col-is-js px-2 py-1 w-full">
      <h3 class="text-3xl font-extrabold text-white w-full">
        {{ title }}
      </h3>
      <p class="row-start-3 w-[98%] min-h-16">
        {{ summary }}
      </p>
      <AuthorComponent
        :author="author"
        :created_at="createdAt"
        :article-detail="true"
      />
      <div class="w-full h-[2px] bg-gray-500/80 my-2"></div>
      <div
        class="article-content px-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-2 [&_p]:mb-1 [&_p]:text-lg"
      >
        <ContentRenderer v-if="page" :value="page.body" />
        <div class="w-full h-[2px] bg-gray-500/80 my-2"></div>
      </div>
      <ArticleComments v-if="page" :article-id="page.articleId" />
    </div>
  </article>
</template>
