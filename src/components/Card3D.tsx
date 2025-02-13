import React, { useState } from "react";

const Card3D: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[800px] h-[1200px]"
        style={{ perspective: "1000px" }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s",
          }}
          className="absolute w-full h-full"
        >
          {/* Front of the Card */}
          <div
            style={{
              backfaceVisibility: "hidden",
            }}
            className="absolute w-full h-full bg-blue-500 rounded-lg flex items-center justify-center"
          >
            <p className="text-white text-2xl">Front of the Card</p>
          </div>

          {/* Back of the Card */}
          <div
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              backgroundImage: "url('/card-back.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
            className="absolute w-full h-full rounded-lg flex items-center justify-center"
          ></div>
        </div>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setFlipped(!flipped)}
      >
        Flip Card
      </button>
    </div>
  );
};

export default Card3D;
