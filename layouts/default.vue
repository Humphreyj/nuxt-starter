<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
</script>

<template>
  <main class="w-full h-full">
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
    <slot />
  </main>
</template>
