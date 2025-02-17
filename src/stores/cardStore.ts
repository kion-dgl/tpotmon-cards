import { atom, onMount } from "nanostores";

type AttackTypes = "None" | "Goon" | "Thirst" | "Gaslight" | "Roast";
type AttackChance = "Direct" | "Dice Roll" | "Coin Flip";
type AbilityTypes = "One-Time" | "Passive" | "Active";

type Ability = {
  type: AbilityTypes;
  name: string;
  description: string;
};

type Attack = {
  name: string;
  chance: AttackChance;
  type: AttackTypes;
  damage: number;
  description: string;
};

type CardData = {
  name: string;
  username: string;
  profilePic: string;
  profileBanner: string;
  followers: number;
  following: number;
  isBlueCheck: boolean;
  weakness: { amount: number; type: AttackTypes };
  resists: { amount: number; type: AttackTypes };
  createdOn: Date;
  rarity: string;
  hp: string;
  abilities: Ability[];
  attacks: Attack[];
  title: string;
};

// Load from localStorage or use default state
const getInitialCardData = (): CardData => {
  try {
    const savedData = localStorage.getItem("cardData");
    return savedData ? JSON.parse(savedData) : getDefaultCardData();
  } catch (e) {
    console.error("Error loading card data from localStorage:", e);
    return getDefaultCardData();
  }
};

// Default card data structure
const getDefaultCardData = (): CardData => ({
  name: "",
  username: "",
  profilePic: "",
  profileBanner: "",
  followers: 0,
  following: 0,
  isBlueCheck: false,
  weakness: { amount: 0, type: "None" },
  resists: { amount: 0, type: "None" },
  createdOn: new Date(),
  rarity: "",
  hp: "",
  abilities: [{ name: "", type: "Passive", description: "" }],
  attacks: [
    { name: "", type: "None", damage: 0, chance: "Direct", description: "" },
  ],
  title: "",
});

// Create NanoStore
export const cardDataStore = atom<CardData>(getInitialCardData());

// Sync store changes to localStorage automatically
onMount(cardDataStore, () => {
  const unsubscribe = cardDataStore.subscribe((value: CardData) => {
    try {
      localStorage.setItem("cardData", JSON.stringify(value));
    } catch (e) {
      console.error("Error saving card data to localStorage:", e);
    }
  });

  return unsubscribe;
});

// Function to set the entire new state (without merging manually)
export const setCardData = (newData: CardData) => {
  cardDataStore.set(newData);
  localStorage.setItem("cardData", JSON.stringify(newData));
};

export type { AttackChance, AttackTypes, AbilityTypes };
