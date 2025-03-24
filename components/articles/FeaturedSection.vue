<script setup>
// Components

// const props = defineProps({})
// const emit = defineEmits()

const { data: articles } = await useAsyncData(() => {
  // Sort these by createdAt descending
  return queryCollection('articles')
    .where('published', '=', true)
    .order('createdAt', 'DESC')
    .all()
})
</script>

<template>
  <section class="flex-col-is-js w-full gap-4 px-4">
    <ArticleCard
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </section>
</template>
