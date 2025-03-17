<script setup>
// Components
import ArticleCard from './ArticleCard.vue'
// const props = defineProps({})
// const emit = defineEmits()
const testFeature = {
  id: 6,
  title: 'A tale of not trying very hard.',
  summary: 'Have you ever had an awesome idea, but then just said fuck it?',
  imageUrl: 'https://i.postimg.cc/Z5KSLPWs/STARFIELD-MAIN-1.jpg',
  created_at: '2023-10-17T00:00:00.000Z',
  author: {
    id: 0,
    name: 'Dan Good',
    imageUrl: 'https://i.postimg.cc/fTxRWHsP/Capture-2025-03-15-152344.png',
  },
}
</script>

<template>
  <section class="flex-col-is-js w-full gap-4 px-1">
    <FeaturedItem />

    <section id="subfeatures" class="flex-col-is-js w-full my-4 gap-2 px-2">
      <ArticleCard />
      <ArticleCard :article="testFeature" />
    </section>
  </section>
</template>
