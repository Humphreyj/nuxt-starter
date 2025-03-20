// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
  },
  compatibilityDate: '2025-01-01',
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
      },
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/fonts', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  image: {
    cloudflare: {
      baseURL: 'cloudflare.com',
    },
    domains: ['i.postimg.cc', 'shared.cloudflare.steamstatic.com'],
    // other options...
  },
  nitro: {
    preset: 'netlify',
  },
  ssr: true,
})
