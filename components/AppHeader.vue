<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
</script>

<template>
  <header
    class="w-full h-16 border-b-2 border-gray-900 bg-headerBg flex items-center justify-between px-2 py-1"
  >
    <img
      src="https://i.postimg.cc/c4GngCHH/DGGLogo.png"
      alt="Damn Good Logo"
      class="w-20"
    />
    <ul class="flex items-center justify-end gap-4 text-primaryText">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/games">Games</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
  </header>
</template>
