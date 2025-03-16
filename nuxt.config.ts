// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  target: 'static',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  image: {
    cloudflare: {
      baseURL: 'cloudflare.com',
    },
    domains: ['i.postimg.cc', 'shared.cloudflare.steamstatic.com'],
    // other options...
  },
})
