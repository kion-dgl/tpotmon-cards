// Define enum values for attack types, ability types, and attack chances
export const AttackTypes = ["None", "Goon", "Thirst", "Gaslight", "Roast"] as const;
export const AbilityTypes = ["One-Time", "Passive", "Active"] as const;
export const AttackChanceTypes = ["Direct", "Dice Roll", "Coin Flip"] as const;

// Types based on the constant values
export type AttackType = (typeof AttackTypes)[number];
export type AbilityType = (typeof AbilityTypes)[number];
export type AttackChanceType = (typeof AttackChanceTypes)[number];

export type Ability = {
  type: AbilityType;
  name: string;
  description: string;
};

export type Attack = {
  name: string;
  chance: AttackChanceType;
  type: AttackType;
  damage: number;
  description: string;
};

export type CardData = {
  name: string;
  username: string;
  profilePic: string;
  profileBanner: string;
  followers: number;
  following: number;
  isBlueCheck: boolean;
  weakness: { amount: number; type: AttackType };
  resists: { amount: number; type: AttackType };
  createdOn: Date | string;
  rarity: string;
  hp: string | number;
  abilities: Ability[];
  attacks: Attack[];
  title: string;
};