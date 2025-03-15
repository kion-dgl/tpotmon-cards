// Define enum values for attack types, ability types, and attack chances
export const AttackTypes = ["None", "Goon", "Thirst", "Gaslight", "Roast"] as const;
export const AbilityTypes = ["One-Time", "Passive", "Active"] as const;
export const AttackChanceTypes = ["Direct", "Dice Roll", "Coin Flip"] as const;

// Types based on the constant values
export type AttackType = (typeof AttackTypes)[number];
export type AbilityType = (typeof AbilityTypes)[number];
export type AttackChanceType = (typeof AttackChanceTypes)[number];