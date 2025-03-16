<script setup>
// Components
// Utils
import { handleFormat } from '#imports'
const props = defineProps({
  featured: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: 'The perks of the simple life',
      summary:
        'This is not anything right now, but it could be. Fishing would be nice.',
      imageUrl:
        'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1771300/ss_709f3329562cd2cfe6db70bac908b3e72eaef83b.1920x1080.jpg?t=1739812122',
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
const { title, summary, imageUrl, author, created_at } = props.featured
</script>

<template>
  <article
    class="w-full bg-gray-400 flex-col-is-jc border-2 rounded-sm border-gray-700"
  >
    <div id="featured-image-container" class="w-full h-full relative">
      <NuxtImg
        :src="imageUrl"
        alt="Featured Game"
        class="w-full h-full object-cover object-center"
      />
    </div>
    <section
      id="featured-info"
      class="w-full h-full p-2 pb-3 flex flex-col-is-je gap-2 bg-slate-700"
    >
      <h3
        class="text-2xl font-bold text-white border-b-2 md:border-b-0 hover:border-b"
      >
        {{ title }}
      </h3>
      <p class="text-sm text-white w-[98%]">
        {{ summary }}
      </p>
      <div class="flex-ic-js gap-2 mt-2">
        <div class="size-10 rounded-full bg-gray-500">
          <NuxtImg
            :src="author.imageUrl"
            alt="Author Image"
            class="w-full h-full object-cover object-center border border-gray-400 rounded-full"
          />
        </div>
        <div class="flex-col-is-js">
          <p class="text-sm text-white">{{ author.name }}</p>
          <p class="text-xs text-gray-300">
            {{ handleFormat(created_at, 'date') }}
          </p>
        </div>
      </div>
    </section>
  </article>
</template>
