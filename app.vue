<script lang="js" setup>


const name = ref('')

async function addUser() {
  const response = await fetch('/api/user/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  name.value = data.name;
  return
}
</script>

<template>
  <div class="w-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
