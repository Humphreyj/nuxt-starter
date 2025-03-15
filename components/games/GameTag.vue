<script setup>
// Components
const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
})
// const emit = defineEmits()
</script>

<template>
  <p class="p-1 text-xs rounded-md bg-[#5BAAD8] text-[#5BAAD8] bg-opacity-40">
    {{ tag }}
  </p>
</template>
