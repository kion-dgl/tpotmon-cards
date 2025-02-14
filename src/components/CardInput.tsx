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
  username: string;
  profilePic: string;
  profileBanner: string;
  followers: number;
  following: number;
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
    username: "",
    profilePic: "",
    profileBanner: "",
    followers: 0,
    following: 0,
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
          onClick={() => alert("Fetch profile logic goes here")}
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
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
            onClick={() => {
              cardData.abilities.push({
                name: "",
                type: "Passive",
                description: "",
              });
            }}
            disabled={cardData.abilities.length + cardData.attacks.length < 2}
          >
            +
          </button>
          {/* Remove Button */}
          <button
            className="px-3 py-1 text-sm ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              cardData.abilities.pop();
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
                    prevState.abilities[index].name = e.target.value;
                    return prevState;
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
                    prevState.abilities[index].type = e.target
                      .value as AbilityTypes;
                    return prevState;
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
                    prevState.abilities[index].description = e.target.value;
                    return prevState;
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
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
            onClick={() => {
              cardData.attacks.push({
                name: "",
                type: "None",
                damage: 0,
                chance: "Direct",
                description: "",
              });
            }}
            disabled={cardData.abilities.length + cardData.attacks.length >= 2}
          >
            +
          </button>
          {/* Remove Button */}
          <button
            className="px-3 py-1 text-sm ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              cardData.attacks.pop();
            }}
            disabled={cardData.attacks.length === 0}
          >
            -
          </button>
        </div>
        {cardData.attacks.map((attack, index) => (
          <div key={index} className="mb-4">
            <div key={index} className="mb-4 border-b-1 pb-2 border-gray-700">
              {/* Name */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={attack.name || ""}
                  onChange={(e) =>
                    setCardData((prevState) => {
                      prevState.attacks[index].name = e.target.value;
                      return prevState;
                    })
                  }
                  placeholder="Enter Name"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Chance</label>
                <select
                  value={attack.chance}
                  onChange={(e) =>
                    setCardData((prevState) => {
                      prevState.attacks[index].chance = e.target
                        .value as AttackChance;
                      return prevState;
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                  <option>Thirst</option>
                  <option>Goon</option>
                  <option>Roast</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={attack.description}
                  onChange={(e) =>
                    setCardData((prevState) => {
                      prevState.attacks[index].description = e.target.value;
                      return prevState;
                    })
                  }
                  placeholder="Enter Description"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                ></textarea>
              </div>

              {/* Chance and Type */}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={attack.type}
                  onChange={(e) =>
                    setCardData((prevState) => {
                      prevState.attacks[index].type = e.target
                        .value as AttackTypes;
                      return prevState;
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
        <div className="flex gap-4">
          <input
            type="number"
            value={cardData.weakness.amount}
            min="0"
            max="100"
            onChange={(e) =>
              handleNestedChange("weakness", "amount", e.target.value)
            }
            className="w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          <select
            value={cardData.weakness.type}
            onChange={(e) =>
              handleNestedChange("weakness", "type", e.target.value)
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
        <div className="flex gap-4">
          <input
            type="number"
            value={cardData.resists.amount}
            min="0"
            max="100"
            onChange={(e) =>
              handleNestedChange("resists", "amount", e.target.value)
            }
            className="w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
          <select
            value={cardData.resists.type}
            onChange={(e) =>
              handleNestedChange("resists", "type", e.target.value)
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
          onChange={(e) => handleInputChange("rarity", e.target.value)}
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
          onChange={(e) => handleInputChange("title", e.target.value)}
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
