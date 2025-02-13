import React, { useState } from "react";

type WeaknessOrResist = {
  amount: number;
  type: string;
};

type Ability = {
  type: "Passive" | "Active" | "One-Time";
  description: string;
};

type Attack = {
  description: string;
  type: string;
};

type CardData = {
  username: string;
  profilePic: string;
  profileBanner: string;
  followers: number;
  following: number;
  weakness: WeaknessOrResist;
  resists: WeaknessOrResist;
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
    weakness: { amount: 0, type: "" },
    resists: { amount: 0, type: "" },
    createdOn: new Date(),
    rarity: "",
    hp: "",
    abilities: [{ type: "Passive", description: "" }],
    attacks: [{ description: "", type: "" }],
    title: "",
  });

  const handleInputChange = (field: keyof CardData, value: any) => {
    setCardData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNestedChange = (
    section: "weakness" | "resists",
    field: keyof WeaknessOrResist,
    value: any,
  ) => {
    setCardData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const incrementNestedAmount = (
    section: "weakness" | "resists",
    step: number,
  ) => {
    setCardData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        amount: prevState[section].amount + step,
      },
    }));
  };

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
    <div className="sm:w-full lg:w-96 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          value={cardData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
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
          onChange={(e) => handleInputChange("hp", e.target.value)}
          placeholder="Enter HP"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
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

      {/* Abilities & Attacks */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Abilities (default: 1)
        </label>
        {/* Similar structure for abilities and attacks */}
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
