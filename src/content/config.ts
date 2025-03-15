import { z, defineCollection } from 'astro:content';

// Define schema for our card collection
const cardCollection = defineCollection({
    type: 'data', // Using 'data' since we're working with JSON
    schema: z.object({
        name: z.string(),
        username: z.string(),
        followers: z.number(),
        following: z.number(),
        isBlueCheck: z.boolean(),
        title: z.string(),
        weakness: z.object({
            amount: z.number(),
            type: z.string()
        }),
        resists: z.object({
            amount: z.number(),
            type: z.string()
        }),
        createdOn: z.string().transform(str => new Date(str)),
    })
});

// Export the collections
export const collections = {
    'cards': cardCollection,
};