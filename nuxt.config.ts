// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  image: {
    cloudflare: {
      baseURL: 'cloudflare.com',
    },
    domains: ['i.postimg.cc', 'shared.cloudflare.steamstatic.com'],
    // other options...
  },
  ssr: true,
})
