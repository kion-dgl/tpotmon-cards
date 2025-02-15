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
              boxShadow: "inset 0 0 0 14px rgb(0,0,0)",
              borderRadius: "35px",
              backgroundColor: "rgb(21, 32, 43)",
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {/* Banner */}
            <div
              style={{
                height: "calc(300px - 14px)",
                width: "calc(100% - 28px)",
                display: "block",
                margin: "auto",
                marginTop: "14px",
                backgroundImage: 'url("/banner/kion.jpeg")',
                backgroundSize: "cover",
                backgroundOrigin: "center",
                backgroundPosition: "center",
                borderTopLeftRadius: "25px",
                borderTopRightRadius: "25px",
                borderBottom: "4px solid #ccc",
                position: "absolute",
                left: "14px",
                top: "0px",
              }}
            />
          </div>

          {/* Profile pic */}
          <div
            style={{
              height: "240px",
              width: "240px",
              borderRadius: "100%",
              backgroundImage: "url('/pfp/kion.jpg')",
              backgroundSize: "contain",
              backgroundOrigin: "center",
              backgroundPosition: "center",
              border: "6px solid #fff",
              position: "absolute",
              top: "210px",
              left: "40px",
              //zIndex: 1,
            }}
          />

          {/* Profile Name */}
          <div
            style={{
              fontSize: "36px",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              left: "300px",
              top: "320px",
            }}
          >
            Kion{" "}
            <svg
              viewBox="0 0 22 22"
              aria-label="Verified account"
              role="img"
              data-testid="icon-verified"
              fill="rgb(29, 155, 240)"
              style={{
                width: "40px",
                height: "40px",
                paddingLeft: "8px",
                color: "rgb(29, 155, 240)",
              }}
            >
              <g>
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
              </g>
            </svg>
          </div>

          {/* Username */}
          <div
            style={{
              fontSize: "32px",
              position: "absolute",
              color: "#bbb",
              left: "300px",
              top: "360px",
            }}
          >
            @WagieWeeb
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

          {/* Summon Cost */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "20px",
              width: "60px",
              height: "60px",
              lineHeight: "60px",
              textAlign: "center",
              color: "#fff",
              backgroundColor: "#333",
              borderRadius: "100%",
              fontSize: "32px",
            }}
          >
            4
          </div>

          {/* HP */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              height: "60px",
              lineHeight: "60px",
              color: "#fff",
              fontSize: "50px",
              textAlign: "right",
            }}
          >
            100 HP
          </div>

          {/* Following / Followers */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "260px",
              color: "#eee",
              fontSize: "20px",
              textAlign: "right",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            3,000 Followers 1,500 Following
          </div>

          {/* Ability and Attack Area */}
          <div
            style={{
              position: "absolute",
              width: "calc(100% - 60px)",
              height: "500px",
              backgroundColor: "pink",
              left: "30px",
              top: "460px",
              color: "#000",
            }}
          >
            <ul>
              <li>Level: Ultrabie</li>
              <li>Weakness: Goon</li>
              <li>Resist: Drama</li>
              <li>Title: Elder Cringe Lord</li>
              <li>Card Number: 152/300</li>
            </ul>
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              left: "15px",
              bottom: "15px",
              height: "70px",
              borderTop: "2px solid #bbb",
              width: "calc(100% - 30px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
              textAlign: "center",
              fontSize: "20px",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "-20px",
                top: "20px",
                textAlign: "center",
                width: "200px",
                letterSpacing: "1px",
              }}
            >
              ULTRABIE
            </span>

            <span
              style={{
                position: "absolute",
                left: "calc(50% - 100px)",
                top: "20px",
                textAlign: "center",
                width: "200px",
              }}
            >
              No. 151 / 300
            </span>

            <span
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                textAlign: "right",
              }}
            >
              Elder Weeb
            </span>
          </div>
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
