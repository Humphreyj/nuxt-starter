<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <header class="w-full h-16 border-b-2 border-gray-900 bg-header px-2 py-1">
    <div
      class="w-full md:w-3/4 lg:w-11/12 mx-auto flex items-center justify-between px-2"
    >
      <NuxtLink to="/">
        <NuxtImg src="img/DGGLogo.png" alt="Damn Good Logo" class="w-20" />
      </NuxtLink>
      <UiSidedrawer :show-sidebar="showSidebar" @toggle="toggleSidebar" />
    </div>
  </header>
</template>
