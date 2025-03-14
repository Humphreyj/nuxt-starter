<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
const { id } = useRoute().params
const { data } = await useFetch(`/api/games/${id}`)
const game = ref(data.value || {})
const { title, tags, release_date, price, purchase_price, review, images } =
  game.value
</script>

<template>
  <main class="flex-col-is-js w-11/12 mx-auto py-4">
    <div id="game-image" class="w-full">
      <NuxtImg
        :src="images.cover"
        alt="Game Image"
        class="w-full h-full rounded-t-sm"
      />
      <div class="flex-ic-je gap-2 w-full">
        <p
          v-for="(screenshot, i) in images.screenshots"
          :key="i"
          class="border rounded-md"
        >
          <NuxtImg
            :src="screenshot"
            alt="Game Image"
            class="w-32 h-24 object-cover overflow-hidden"
          />
        </p>
      </div>
    </div>
    <section class="w-full">
      <div
        id="game-info"
        class="w-full flex flex-col p-2 items-start justify-start gap-1 relative border"
      >
        <h3 class="font-bold text-xl">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-500">Price: {{ price }}</p>
        <p class="text-sm text-gray-500">
          Purchase Price: {{ purchase_price }}
        </p>
        <p class="text-sm text-gray-500">Released: {{ release_date }}</p>
        <div class="flex-ic-js gap-1">
          <p v-for="(tag, i) in tags" :key="i" class="border rounded-md">
            {{ tag }}
          </p>
        </div>
      </div>
    </section>
    <section id="review">{{ review }}</section>
  </main>
</template>
