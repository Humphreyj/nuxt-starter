<script setup>
// Components
const props = defineProps({
  author: Object,
  created_at: String,
  articleDetail: Boolean,
})
// const emit = defineEmits()
const containerClass = computed(() => {
  return props.articleDetail ? 'flex-ic-js gap-2' : 'flex-col-is-js'
})
const avatarClass = computed(() => {
  return props.articleDetail
    ? 'size-6 rounded-full bg-gray-500'
    : 'size-10 rounded-full bg-gray-500'
})
</script>

<template>
  <div class="flex-ic-js gap-2">
    <div :class="avatarClass">
      <NuxtImg
        :src="author.imageUrl"
        alt="Author Image"
        class="w-full h-full object-cover object-center border border-gray-400 rounded-full"
      />
    </div>
    <div :class="containerClass">
      <p class="text-sm text-white">{{ author.name }}</p>
      <p class="text-xs text-gray-300">
        {{ handleFormat(created_at, 'date') }}
      </p>
    </div>
  </div>
</template>
