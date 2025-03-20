import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      source: 'articles/**',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        articleId: z.string(),
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        imageUrl: z.string(),
        date: z.date(),
        gameId: z.string(),
        createdAt: z.date(),
        author: z.object({
          id: z.number().optional(),
          name: z.string(),
          imageUrl: z.string().optional(),
        }),
      }),
    }),
  },
})
