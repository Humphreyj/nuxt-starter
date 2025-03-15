// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/image'],
  tailwindcss: {
    cssPath: [`~/assets/css/tailwind.css`, { injectPosition: 'first' }],
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  image: {
    cloudflare: {
      baseURL: 'https://shared.cloudflare.steamstatic.com',
    },
    domains: ['i.postimg.cc'],
    // other options...
  },
})
