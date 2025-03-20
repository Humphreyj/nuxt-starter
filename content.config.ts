import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      source: 'articles/**',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        gameId: z.string(),
      }),
    }),
  },
})
