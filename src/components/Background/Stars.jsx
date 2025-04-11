import React, { useState, useEffect } from "react";

const Stars = () => {
    const [stars, setStars] = useState([]);
    useEffect(() => {
        fetch("/data/stars/stars.json")
            .then((res) => res.json())
            .then(setStars);
    }, []);

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
