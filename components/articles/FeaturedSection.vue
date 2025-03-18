<script setup>
// Components
import ArticleCard from './ArticleCard.vue'
// const props = defineProps({})
// const emit = defineEmits()
const { data } = await useFetch('/api/articles/getArticles')
console.log(data.value)
const articleList = ref(data.value.articles || [])
</script>

<template>
  <section class="flex-col-is-js w-full gap-4 px-1">
    <ArticleCard
      v-for="article in articleList"
      :key="article.id"
      :article="article"
    />
  </section>
</template>
