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
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/content',
    '@pinia/nuxt',
    'nuxt-auth-utils',
    '@prisma/nuxt',
    '@vueuse/nuxt',
  ],
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
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24, // 1 day
      password: process.env.NUXT_SESSION_PASSWORD || 'default_password', // required password
    },
  },
  ssr: true,
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser':
          './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
})