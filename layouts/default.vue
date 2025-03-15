<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
</script>

<template>
  <main class="w-full min-h-screen relative flex flex-col">
    <AppHeader />
    <div
      class="w-full flex-grow flex-shrink-0 basis-auto bg-gray-800 text-primaryText"
    >
      <slot />
    </div>
    <footer
      class="w-full h-16 border-t-2 border-gray-900 shrink-0 -mt-16 bg-headerBg flex items-center justify-center"
    >
      <p class="text-sm text-primaryText">© 2025 Damn Good Games</p>
    </footer>
  </main>
</template>
