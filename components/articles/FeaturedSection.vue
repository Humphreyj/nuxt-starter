<script setup>
// Components
import SubFeature from './SubFeature.vue'
// const props = defineProps({})
// const emit = defineEmits()
const testFeature = {
  id: 6,
  title: 'My brief adventure as a game dev.',
  summary: 'This game sucks.',
  imageUrl:
    'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2022/06/StarfieldShowcase_HERO-165ee8e45d4141d2d754.jpg',
  created_at: '2023-10-17T00:00:00.000Z',
  author: {
    id: 0,
    name: 'Dan Good',
    imageUrl: 'https://i.postimg.cc/fTxRWHsP/Capture-2025-03-15-152344.png',
  },
}
</script>

<template>
  <section class="flex-col-is-js w-full">
    <FeaturedItem />
    <section id="subfeatures" class="flex-ic-jb w-full my-4 gap-2">
      <SubFeature />
      <SubFeature :feature="testFeature" />
    </section>
  </section>
</template>
