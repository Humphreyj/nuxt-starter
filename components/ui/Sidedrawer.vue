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
        <nav class="py-4">
          <ul
            class="flex-col-is-js gap-4 text-primary-text text-lg font-semibold pl-2"
          >
            <li>
              <nuxt-link to="/" @click="toggle">
                <div class="flex-ic-js gap-2">
                  <UIcon
                    name="lucide:home"
                    class="text-2xl text-primary-text"
                  />
                  <span class="">Home</span>
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/games" @click="toggle">
                <div class="flex-ic-js gap-2">
                  <UIcon
                    name="lucide:gamepad-2"
                    class="text-2xl text-primary-text"
                  />
                  <span class="">Games</span>
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about" @click="toggle">
                <div class="flex-ic-js gap-2">
                  <UIcon
                    name="lucide:ghost"
                    class="text-2xl text-primary-text"
                  />
                  <span class="">About</span>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </section>
    </template>
  </UDrawer>
</template>
