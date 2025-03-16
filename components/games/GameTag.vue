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
  <p class="p-1 text-xs rounded-md bg-tag-color/35 text-tag-color">
    {{ tag }}
  </p>
</template>
