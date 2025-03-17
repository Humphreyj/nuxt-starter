<script setup>
// Components
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      'https://picsum.photos/640/640?random=1',
      'https://picsum.photos/640/640?random=2',
      'https://picsum.photos/640/640?random=3',
      'https://picsum.photos/640/640?random=4',
      'https://picsum.photos/640/640?random=5',
      'https://picsum.photos/640/640?random=6',
    ],
  },
})
// const emit = defineEmits()
const { items } = toRefs(props)
</script>

<template>
  <UCarousel v-slot="{ item }" auto-height :items="items" class="w-full h-full">
    <NuxtImg
      :src="item"
      class="object-cover overflow-hidden w-full h-full"
      height="500"
      width="600"
    />
  </UCarousel>
</template>
