import React from "react";
import stars from "../../assets/backgrounds/stars/stars.json";

const Stars = () => {
    return (
        <svg
            className="fixed text-zinc-100 z-[-4] blur-sm"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
        >
            {stars.map((star, index) => (
                <circle
                    className="z-50"
                    key={index}
                    cx={`${star.xPos}%`}
                    cy={`${star.yPos}%`}
                    r={star.size}
                    fill="currentColor"
                    opacity={1}
                />
            ))}
        </svg>
    )
};



export default Stars;
