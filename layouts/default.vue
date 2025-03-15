<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
</script>

<template>
  <main class="w-full min-h-screen relative flex flex-col">
    <nav
      class="w-full h-12 border-b-2 border-gray-900 flex items-center justify-between px-2"
    >
      <h1 class="font-bold">Damn Good Games</h1>
      <ul class="flex items-center justify-end gap-4">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="w-full flex-grow flex-shrink-0 basis-auto">
      <slot />
    </div>
    <footer
      class="w-full h-16 border-t-2 border-gray-900 shrink-0 -mt-16 bg-gray-950 flex items-center justify-center"
    >
      <p class="text-sm text-gray-400">© 2023 Damn Good Games</p>
    </footer>
  </main>
</template>
