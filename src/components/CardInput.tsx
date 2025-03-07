import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { cardDataStore, setCardData, resetCardData } from "../stores/cardStore"; // Import store
import type {
  AbilityTypes,
  AttackChance,
  AttackTypes,
} from "../stores/cardStore";

type ProfileWorkerResponse = {
  name: string;
  username: string;
  isBlueVerified: boolean;
  followers: number;
  following: number;
  profilePicture: string;
  coverPicture: string;
};

const CardInput: React.FC = () => {
  const cardData = useStore(cardDataStore);
  const [locked, setLocked] = useState(
    localStorage.getItem("user-set") ? true : false,
  );
  const [username, setUsername] = useState(locked ? cardData.username : "");

  const fetchProfile = async () => {
    if (!username.length) {
      alert("Please enter a username.");
      return;
    }

    try {
      const response = await fetch(
        `https://profile.kion-87a.workers.dev/?username=${username}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = (await response.json()) as ProfileWorkerResponse;
      setCardData({
        ...cardData,
        username: profileData.username,
        name: profileData.name,
        followers: profileData.followers,
        following: profileData.following,
        profilePic: profileData.profilePicture,
        profileBanner: profileData.coverPicture,
        isBlueCheck: profileData.isBlueVerified,
      });

      setLocked(true);
      localStorage.setItem("user-set", "true");
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-60"
          disabled={locked}
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <button
          className="w-1/2 px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
          onClick={(e) => {
            resetCardData();
            setLocked(false);
            localStorage.removeItem("user-set");
          }}
          disabled={!locked}
        >
          Clear Form
        </button>

        <button
          className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={fetchProfile}
          disabled={locked}
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
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
          disabled={!locked}
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
            disabled={
              cardData.abilities.length + cardData.attacks.length >= 2 ||
              !locked
            }
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
            disabled={cardData.abilities.length === 0 || !locked}
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
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                disabled={!locked}
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
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                disabled={!locked}
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
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                disabled={!locked}
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
            disabled={
              cardData.abilities.length + cardData.attacks.length >= 2 ||
              !locked
            }
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
            disabled={cardData.attacks.length === 0 || !locked}
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
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                  disabled={!locked}
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
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                  disabled={!locked}
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
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                  disabled={!locked}
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
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
                  disabled={!locked}
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
              const newAmount = Math.max(0, cardData.weakness.amount - 10);

              setCardData({
                ...cardData,
                weakness: { ...cardData.weakness, amount: newAmount },
              });
            }}
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
          >
            -
          </button>

          <input
            type="number"
            value={cardData.weakness.amount}
            readOnly
            className="w-16 text-center px-2 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
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
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
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
            className="w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
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
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
          >
            -
          </button>

          <input
            type="number"
            value={cardData.resists.amount}
            readOnly
            className="w-16 text-center px-2 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
          />

          <button
            type="button"
            onClick={() => {
              const newAmount = Math.min(100, cardData.resists.amount + 10);
              setCardData({
                ...cardData,
                resists: { ...cardData.resists, amount: newAmount },
              });
            }}
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
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
            className="w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
            disabled={!locked}
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
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
          disabled={!locked}
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
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50"
          disabled={!locked}
        />
      </div>

      {/* Download Image & JSON */}
      <div className="mb-4 flex space-x-4">
        <button
          className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none disabled:opacity-50"
          onClick={(e) => {
            const json = JSON.stringify(cardData, null, 2); // Assuming `editorOutput` holds the JSON
            navigator.clipboard
              .writeText(json)
              .then(() => {
                alert("JSON copied to clipboard!");
              })
              .catch((err) => console.error("Copy failed", err));
          }}
          disabled={!locked}
        >
          Copy Card Data
        </button>

        <button
          className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50"
          disabled={!locked}
          onClick={(e) => {
            const url = `https://github.com/kion-dgl/tpotmon-cards/new/main/collections?filename=${cardData.username}.json`;
            window.open(url, "_blank");
          }}
        >
          Create Card
        </button>
      </div>
    </div>
  );
};

export default CardInput;
