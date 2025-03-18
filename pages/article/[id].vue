<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
const { id } = useRoute().params
const { data } = await useFetch(`/api/articles/${id}`)
const article = ref(data.value || {})
const { title, summary, content, imageUrl, created_at, author } = article.value
</script>

<template>
  <article class="flex-col-is-js w-full">
    <div class="w-full">
      <NuxtImg :src="imageUrl" class="object-contain w-full h-full"></NuxtImg>
    </div>
    <div class="flex-col-is-js px-2 py-1 w-full">
      <h3 class="text-3xl font-bold text-white border-b w-full hover:underline">
        {{ title }}
      </h3>
      <p class="row-start-3 w-[98%] min-h-16">
        {{ summary }}
      </p>
      <AuthorComponent
        :author="author"
        :created_at="created_at"
        :article-detail="true"
      />
      <div class="w-full h-[2px] bg-gray-500/80 my-2"></div>
      <section
        v-for="(section, i) in content"
        :key="i"
        id="article-content"
        class="w-full pb-6"
      >
        <h3 class="font-bold text-2xl my-1">{{ section.title }}</h3>
        <p>{{ section.text }}</p>
      </section>
    </div>
  </article>
</template>
