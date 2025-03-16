<script setup>
// Components
const props = defineProps({
  showSidebar: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggle'])
const open = ref(props.showSidebar)
const toggle = () => {
  open.value = !open.value
  emit('toggle', open.value)
}
</script>

<template>
  <UDrawer v-model:open="open" direction="left">
    <UButton
      color="neutral"
      variant="subtle"
      trailing-icon="lucide:align-justify"
    />

    <template #content>
      <section
        class="w-full min-w-[300px] h-full flex-col-is-js py-2 px-4 pb-12"
      >
        <img
          src="https://i.postimg.cc/c4GngCHH/DGGLogo.png"
          alt="Damn Good Logo"
          class="w-32"
        />
        <nav>
          <ul class="flex-col-is-js gap-4 text-primary-text text-lg pl-2">
            <li>
              <nuxt-link to="/" @click="toggle">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/games" @click="toggle">Games</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about" @click="toggle">About</nuxt-link>
            </li>
          </ul>
        </nav>
      </section>
    </template>
  </UDrawer>
</template>
