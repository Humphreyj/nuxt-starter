<script setup>
import { ref } from 'vue'
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

const iframe = ref(null)

iframe.value?.stopVideo()
iframe.value?.pauseVideo()
iframe.value?.playVideo()
</script>

<template>
  <div class="w-full article-video">
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      ref="iframe"
      title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
    />
  </div>
</template>
