<script setup>
// Components
// const props = defineProps({})
// const emit = defineEmits()
const showSidebar = ref(false)
const openSidebar = () => {
  showSidebar.value = true
}
const toggleSidebar = () => {
  console.log('showSidebar', showSidebar.value)
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <header class="w-full h-16 border-b-2 border-gray-900 bg-header px-2 py-1">
    <div class="w-full md:w-3/4 mx-auto flex items-center justify-between px-2">
      <img
        src="https://i.postimg.cc/c4GngCHH/DGGLogo.png"
        alt="Damn Good Logo"
        class="w-20"
      />
      <UiSidedrawer :show-sidebar="showSidebar" @toggle="toggleSidebar" />
    </div>
  </header>
</template>
