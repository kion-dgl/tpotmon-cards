import { z, defineCollection } from 'astro:content';

// Define schema for our card collection
const cardCollection = defineCollection({
  type: 'data', // Using 'data' since we're working with JSON
  schema: z.object({
    name: z.string(),
    username: z.string(),
    profilePic: z.string(),
    profileBanner: z.string(),
    followers: z.number(),
    following: z.number(),
    isBlueCheck: z.boolean(),
    weakness: z.object({
      amount: z.number(),
      type: z.string()
    }),
    resists: z.object({
      amount: z.number(),
      type: z.string()
    }),
    createdOn: z.string().transform(str => new Date(str)),
    rarity: z.string().optional(),
    hp: z.string().optional(),
    abilities: z.array(z.object({
      name: z.string(),
      type: z.string(),
      description: z.string()
    })),
    attacks: z.array(z.object({
      name: z.string(),
      type: z.string(),
      damage: z.number(),
      chance: z.string(),
      description: z.string()
    })),
    title: z.string().optional()
  })
});

// Export the collections
export const collections = {
  'cards': cardCollection,
};