import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { cardDataStore, setCardData } from "../stores/cardStore"; // Import store
import type {
  AbilityTypes,
  AttackChance,
  AttackTypes,
} from "../stores/cardStore";

const CardInput: React.FC = () => {
  const cardData = useStore(cardDataStore);

  const downloadCardData = () => {
    const json = JSON.stringify(cardData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${cardData.username || "card-data"}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const fetchProfile = async () => {
    if (!cardData.username) {
      alert("Please enter a username.");
      return;
    }

    try {
      const response = await fetch(
        `https://profile.kion-87a.workers.dev/?username=${cardData.username}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = await response.json();
      console.log(profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("There was an error fetching the profile.");
    }
  };

  return (
    <div className="sm:w-full lg:w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          value={cardData.username}
          onChange={(e) =>
            setCardData({
              ...cardData,
              username: e.target.value,
            })
          }
          placeholder="Enter username"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      <div className="mb-4">
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={fetchProfile}
        >
          Fetch Profile
        </button>
      </div>

      {/* HP */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">HP</label>
        <input
          type="number"
          value={cardData.hp}
          onChange={(e) =>
            setCardData({
              ...cardData,
              hp: e.target.value,
            })
          }
          placeholder="Enter HP"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      {/* Abilities Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 border-b-1 pb-2 border-gray-600">
          <label className="text-lg font-medium flex-1">Ability</label>

          <button
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 disabled:opacity-50"
            onClick={() => {
              setCardData({
                ...cardData,
                abilities: [
                  ...cardData.abilities,
                  {
                    name: "",
                    type: "Passive",
                    description: "",
                  },
                ],
              });
            }}
            disabled={cardData.abilities.length + cardData.attacks.length >= 2}
          >
            +
          </button>
          {/* Remove Button */}
          <button
            className="px-3 py-1 text-sm ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={() => {
              setCardData({
                ...cardData,
                abilities: cardData.abilities.slice(0, -1), // Create a new array without the last element
              });
            }}
            disabled={cardData.abilities.length === 0}
          >
            -
          </button>
        </div>
        {cardData.abilities.map((ability, index) => (
          <div key={index} className="mb-4 border-b-1 pb-2 border-gray-700">
            {/* Name */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={ability.name || ""}
                onChange={(e) => {
                  const newAbilities = [...cardData.abilities]; // Create a shallow copy of the abilities array
                  newAbilities[index] = {
                    ...newAbilities[index],
                    name: e.target.value,
                  };

                  setCardData({
                    ...cardData,
                    abilities: newAbilities,
                  });
                }}
                placeholder="Enter Name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            {/* Type */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={ability.type}
                onChange={(e) => {
                  const newAbilities = [...cardData.abilities]; // Create a shallow copy of the abilities array
                  newAbilities[index] = {
                    ...newAbilities[index],
                    type: e.target.value as AbilityTypes,
                  };

                  setCardData({
                    ...cardData,
                    abilities: newAbilities,
                  });
                }}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option>One-Time</option>
                <option>Passive</option>
                <option>Active</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={ability.description}
                onChange={(e) => {
                  const newAbilities = [...cardData.abilities]; // Create a shallow copy of the abilities array
                  newAbilities[index] = {
                    ...newAbilities[index],
                    description: e.target.value,
                  };

                  setCardData({
                    ...cardData,
                    abilities: newAbilities,
                  });
                }}
                placeholder="Enter Description"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              ></textarea>
            </div>
          </div>
        ))}
      </div>

      {/* Attacks Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 border-b-1 pb-2 border-gray-600">
          <label className="text-lg font-medium flex-1">Attack</label>

          <button
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 disabled:opacity-50"
            onClick={() => {
              setCardData({
                ...cardData,
                attacks: [
                  ...cardData.attacks,
                  {
                    name: "",
                    type: "None",
                    damage: 0,
                    chance: "Direct",
                    description: "",
                  },
                ],
              });
            }}
            disabled={cardData.abilities.length + cardData.attacks.length >= 2}
          >
            +
          </button>
          {/* Remove Button */}
          <button
            className="px-3 py-1 text-sm ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={() => {
              setCardData({
                ...cardData,
                attacks: cardData.attacks.slice(0, -1), // Create a new array without the last element
              });
            }}
            disabled={cardData.attacks.length === 0}
          >
            -
          </button>
        </div>
        {cardData.attacks.map((attack, index) => (
          <div key={index} className="mb-4">
            <div className="mb-4 border-b-1 pb-2 border-gray-700">
              {/* Name */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={attack.name || ""}
                  onChange={(e) => {
                    const newAttacks = [...cardData.attacks];
                    newAttacks[index] = {
                      ...newAttacks[index],
                      name: e.target.value,
                    };
                    setCardData({ ...cardData, attacks: newAttacks });
                  }}
                  placeholder="Enter Name"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              {/* Chance */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Chance</label>
                <select
                  value={attack.chance}
                  onChange={(e) => {
                    const newAttacks = [...cardData.attacks];
                    newAttacks[index] = {
                      ...newAttacks[index],
                      chance: e.target.value as AttackChance,
                    };
                    setCardData({ ...cardData, attacks: newAttacks });
                  }}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                  <option>Direct</option>
                  <option>Coin Flip</option>
                  <option>Dice Roll</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={attack.description || ""}
                  onChange={(e) => {
                    const newAttacks = [...cardData.attacks];
                    newAttacks[index] = {
                      ...newAttacks[index],
                      description: e.target.value,
                    };
                    setCardData({ ...cardData, attacks: newAttacks });
                  }}
                  placeholder="Enter Description"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                ></textarea>
              </div>

              {/* Type */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={attack.type}
                  onChange={(e) => {
                    const newAttacks = [...cardData.attacks];
                    newAttacks[index] = {
                      ...newAttacks[index],
                      type: e.target.value as AttackTypes,
                    };

                    setCardData({ ...cardData, attacks: newAttacks });
                  }}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                  <option>Thirst</option>
                  <option>Goon</option>
                  <option>Roast</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weakness */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Weakness</label>
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={() => {
              const newAmount = Math.min(100, cardData.weakness.amount - 10);

              setCardData({
                ...cardData,
                weakness: { ...cardData.weakness, amount: newAmount },
              });
            }}
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            -
          </button>

          <input
            type="number"
            value={cardData.weakness.amount}
            readOnly
            className="w-16 text-center px-2 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />

          <button
            type="button"
            onClick={() => {
              const newAmount = Math.min(100, cardData.weakness.amount + 10);

              setCardData({
                ...cardData,
                weakness: { ...cardData.weakness, amount: newAmount },
              });
            }}
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            +
          </button>

          <select
            value={cardData.weakness.type}
            onChange={(e) =>
              setCardData({
                ...cardData,
                weakness: {
                  ...cardData.weakness,
                  type: e.target.value as AttackTypes,
                },
              })
            }
            className="w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            <option value="">None</option>
            <option>Gaslighting</option>
            <option>PsychOps</option>
            <option>Catfish</option>
            <option>Goon</option>
            <option>Roast</option>
          </select>
        </div>
      </div>

      {/* Resists */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Resists</label>
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={() => {
              const newAmount = Math.max(0, cardData.resists.amount - 10);
              setCardData({
                ...cardData,
                resists: { ...cardData.resists, amount: newAmount },
              });
            }}
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            -
          </button>

          <input
            type="number"
            value={cardData.resists.amount}
            readOnly
            className="w-16 text-center px-2 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />

          <button
            type="button"
            onClick={() => {
              const newAmount = Math.min(100, cardData.resists.amount - 10);
              setCardData({
                ...cardData,
                resists: { ...cardData.resists, amount: newAmount },
              });
            }}
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            +
          </button>

          <select
            value={cardData.resists.type}
            onChange={(e) =>
              setCardData({
                ...cardData,
                resists: {
                  ...cardData.resists,
                  type: e.target.value as AttackTypes,
                },
              })
            }
            className="w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          >
            <option value="">None</option>
            <option>Gaslighting</option>
            <option>PsychOps</option>
            <option>Catfish</option>
            <option>Goon</option>
            <option>Roast</option>
          </select>
        </div>
      </div>

      {/* Rarity */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rarity</label>
        <select
          value={cardData.rarity}
          onChange={(e) =>
            setCardData({
              ...cardData,
              rarity: e.target.value,
            })
          }
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="">Select Rarity</option>
          <option>Common</option>
          <option>Rare</option>
          <option>Ultra Rare</option>
        </select>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={cardData.title}
          onChange={(e) =>
            setCardData({
              ...cardData,
              title: e.target.value,
            })
          }
          placeholder="Enter Title"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      {/* Download Image & JSON */}
      <div className="mb-4">
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={downloadCardData}
        >
          Download Card Data (JSON)
        </button>
      </div>
    </div>
  );
};

export default CardInput;
