import React, { useState } from "react";

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

const CardInput: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: "",
    username: "",
    profilePic: "", // base64 png
    profileBanner: "", // base64 png
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
            setCardData((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
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
            setCardData((prevState) => ({
              ...prevState,
              hp: e.target.value,
            }))
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
              setCardData((prevState) => ({
                ...prevState,
                abilities: [
                  ...prevState.abilities,
                  {
                    name: "",
                    type: "Passive",
                    description: "",
                  },
                ],
              }));
            }}
            disabled={cardData.abilities.length + cardData.attacks.length >= 2}
          >
            +
          </button>
          {/* Remove Button */}
          <button
            className="px-3 py-1 text-sm ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={() => {
              setCardData((prevCard) => ({
                ...prevCard,
                abilities: prevCard.abilities.slice(0, -1), // Create a new array without the last element
              }));
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
                onChange={(e) =>
                  setCardData((prevState) => {
                    const newAbilities = [...prevState.abilities]; // Create a shallow copy of the abilities array
                    newAbilities[index] = {
                      ...newAbilities[index],
                      name: e.target.value,
                    }; // Create a new object for the specific ability
                    return { ...prevState, abilities: newAbilities }; // Return a new state object with updated abilities
                  })
                }
                placeholder="Enter Name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            {/* Type */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={ability.type}
                onChange={(e) =>
                  setCardData((prevState) => {
                    const newAbilities = [...prevState.abilities]; // Create a shallow copy of the abilities array
                    newAbilities[index] = {
                      ...newAbilities[index],
                      type: e.target.value as AbilityTypes,
                    }; // Create a new object for the specific ability
                    return { ...prevState, abilities: newAbilities }; // Return a new state object with updated abilities
                  })
                }
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
                onChange={(e) =>
                  setCardData((prevState) => {
                    const newAbilities = [...prevState.abilities]; // Create a shallow copy of the abilities array
                    newAbilities[index] = {
                      ...newAbilities[index],
                      description: e.target.value,
                    }; // Create a new object for the specific ability
                    return { ...prevState, abilities: newAbilities }; // Return a new state object with updated abilities
                  })
                }
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
              setCardData((prevState) => ({
                ...prevState,
                attacks: [
                  ...prevState.attacks,
                  {
                    name: "",
                    type: "None",
                    damage: 0,
                    chance: "Direct",
                    description: "",
                  },
                ],
              }));
            }}
            disabled={cardData.abilities.length + cardData.attacks.length >= 2}
          >
            +
          </button>
          {/* Remove Button */}
          <button
            className="px-3 py-1 text-sm ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            onClick={() => {
              setCardData((prevCard) => ({
                ...prevCard,
                attacks: prevCard.attacks.slice(0, -1), // Create a new array without the last element
              }));
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
                  onChange={(e) =>
                    setCardData((prevState) => {
                      const newAttacks = [...prevState.attacks];
                      newAttacks[index] = {
                        ...newAttacks[index],
                        name: e.target.value,
                      };
                      return { ...prevState, attacks: newAttacks };
                    })
                  }
                  placeholder="Enter Name"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              {/* Chance */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Chance</label>
                <select
                  value={attack.chance}
                  onChange={(e) =>
                    setCardData((prevState) => {
                      const newAttacks = [...prevState.attacks];
                      newAttacks[index] = {
                        ...newAttacks[index],
                        chance: e.target.value as AttackChance,
                      };
                      return { ...prevState, attacks: newAttacks };
                    })
                  }
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
                  onChange={(e) =>
                    setCardData((prevState) => {
                      const newAttacks = [...prevState.attacks];
                      newAttacks[index] = {
                        ...newAttacks[index],
                        description: e.target.value,
                      };
                      return { ...prevState, attacks: newAttacks };
                    })
                  }
                  placeholder="Enter Description"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                ></textarea>
              </div>

              {/* Type */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={attack.type}
                  onChange={(e) =>
                    setCardData((prevState) => {
                      const newAttacks = [...prevState.attacks];
                      newAttacks[index] = {
                        ...newAttacks[index],
                        type: e.target.value as AttackTypes,
                      };
                      return { ...prevState, attacks: newAttacks };
                    })
                  }
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
            onClick={() =>
              setCardData((prevState) => {
                const newAmount = Math.max(0, prevState.weakness.amount - 10);
                return {
                  ...prevState,
                  weakness: { ...prevState.weakness, amount: newAmount },
                };
              })
            }
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
            onClick={() =>
              setCardData((prevState) => {
                const newAmount = Math.min(100, prevState.weakness.amount + 10);
                return {
                  ...prevState,
                  weakness: { ...prevState.weakness, amount: newAmount },
                };
              })
            }
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            +
          </button>

          <select
            value={cardData.weakness.type}
            onChange={(e) =>
              setCardData((prevState) => {
                return {
                  ...prevState,
                  weakness: {
                    ...prevState.weakness,
                    type: e.target.value as AttackTypes,
                  },
                };
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
            onClick={() =>
              setCardData((prevState) => {
                const newAmount = Math.max(0, prevState.resists.amount - 10);
                return {
                  ...prevState,
                  resists: { ...prevState.resists, amount: newAmount },
                };
              })
            }
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
            onClick={() =>
              setCardData((prevState) => {
                const newAmount = Math.min(100, prevState.resists.amount + 10);
                return {
                  ...prevState,
                  resists: { ...prevState.resists, amount: newAmount },
                };
              })
            }
            className="px-2 py-1 border rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
          >
            +
          </button>

          <select
            value={cardData.resists.type}
            onChange={(e) =>
              setCardData((prevState) => {
                return {
                  ...prevState,
                  resists: {
                    ...prevState.resists,
                    type: e.target.value as AttackTypes,
                  },
                };
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
            setCardData((prevState) => ({
              ...prevState,
              rarity: e.target.value,
            }))
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
            setCardData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
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
