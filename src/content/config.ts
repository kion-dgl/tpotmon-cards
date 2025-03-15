import { z, defineCollection } from 'astro:content';

// Define schema for our card collection
const cardCollection = defineCollection({
  type: 'data', // Using 'data' since we're working with JSON
  schema: z.object({
    name: z.string(),
    username: z.string(),
    title: z.string()
  })
});

// Export the collections
export const collections = {
  'cards': cardCollection,
};