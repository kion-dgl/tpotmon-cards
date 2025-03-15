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
        profilePic: z.string().startsWith("data:image", "Profile picture must be a data URL starting with 'data:image'"),
        profileBanner: z.string().startsWith("data:image", "Banner must be a data URL starting with 'data:image'"),
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
        rarity: z.enum(["Common", "Uncommon", "Rare", "Epic", "Legendary"]), // Only allow specific rarity values
        hp: z.union([z.number(), z.null()]), // Must be a number or null, but must exist
        abilities: z.array(z.object({
            name: z.string(),
            type: z.string(),
            description: z.string()
        })).max(2, "Maximum of 2 abilities allowed"),
        attacks: z.array(z.object({
            name: z.string(),
            type: z.string(),
            damage: z.number(),
            chance: z.string(),
            description: z.string()
        })).max(2, "Maximum of 2 attacks allowed"),
    })
});

// Export the collections
export const collections = {
    'cards': cardCollection,
};