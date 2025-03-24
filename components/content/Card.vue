<script setup>
// Components
import DGG from '../../public/img/DGGLogo.png'
const props = defineProps({
  article: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      title: 'Literally a sandbox',
      summary: 'Play trucks with your homies.',
      imageUrl: 'https://i.postimg.cc/fRwwrnrK/roadcraft-Cover.jpg',
      created_at: '2023-10-17T00:00:00.000Z',
      author: {
        id: 0,
        name: 'Dan Good',
        imageUrl: 'https://i.postimg.cc/fTxRWHsP/Capture-2025-03-15-152344.png',
      },
    }),
  },
})
// const emit = defineEmits()
</script>

<template>
  <div
    class="w-full flex-col-is-js border-3 rounded-sm border-gray-500/80 shadow-lg shadow-neutral-900"
  >
    <slot />
  </div>
</template>
