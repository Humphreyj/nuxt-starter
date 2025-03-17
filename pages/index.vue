<script setup>
// Components
import FeaturedSection from '~/components/articles/FeaturedSection.vue'
// const props = defineProps({})
// const emit = defineEmits()
</script>

<template>
  <div
    class="h-full w-full md:w-1/3 mx-auto flex flex-col items-start justify-start pb-12"
  >
    <div
      class="w-max mx-auto border-b-2 p-2 rounded-md my-4 border-gray-900 bg-header flex-col-ic-jc px-2 py-1"
    >
      <h1 class="font-bold text-3xl font-title tracking-wider">
        Damn Good Games
      </h1>
      <p class="font-display">No bullshit reviews and news.</p>
      <p class="text-[12px] font-display">Some bullshit opinions.</p>
    </div>
    <FeaturedSection />
  </div>
</template>
