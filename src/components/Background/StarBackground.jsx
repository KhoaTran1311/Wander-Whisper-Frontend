import React, {useEffect, useMemo, useState} from 'react';
import EarthLoading from "../Loading/EarthLoading.jsx";

const StarBackground = ({ loading }) => {

    const initialState = useMemo(() => {
        return Array.from({ length: 100 }, () => ({
            xPos : (Math.random() * 4 - 1.5) * 100,
            yPos : (Math.random() * 2 - 0.5) * 100,
            size : Math.random() * 0.5 + 0.1,
        }));
    }, []);

    return (
        <div className={`fixed overflow-hidden h-screen w-screen z-[-5] bg-zinc-950 top-0 left-0 select-none cursor-default blur-sm`}>
            {loading ? (
                <div>
                    <div className="absolute aspect-square h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <EarthLoading/>
                    </div>
                </div>

            ) : (
                <img
                    className="
                        w-1/1 xl:w-2/3 lg:w-5/6 sm:w-7/6 xs:w-6/6
                        left-1/5 xl:left-2/5 lg:left-1/4 sm:left-1/8
                        top-1/2 xl:top-1/3 lg:top-2/5
                        aspect-square absolute
                        earth_background"
                    src={`src/assets/earth_background_small/frame_1_small.png`}
                    alt="Earth background"/>
            )}

            <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
            >
                {initialState.map((star, index) => (
                    <circle
                        key={index}
                        cx={`${star.xPos}%`}
                        cy={`${star.yPos}%`}
                        r={star.size}
                        fill="white"
                        opacity={star.size}
                    />
                ))}
            </svg>
        </div>
    )
};



export default StarBackground;

// <div style={styles.container} className="z-0">
//     {stars.map((star, index) => (
//         <div
//             key={index}
//             style={{
//                 ...styles.star,
//                 left: `${star.xPos}%`,
//                 top: `${star.yPos}%`,
//                 width: `${star.size}px`,
//                 height: `${star.size}px`,
//             }}
//         />
//     ))}
// </div>    md:w-5/6 sm:w-4/5 xs:w-5/6

//
// const styles = {
//     container: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'transparent',
//         overflow: 'hidden',
//     },
//     star: {
//         position: 'absolute',
//         borderRadius: '50%',
//         backgroundColor: 'white',
//         animation: 'twinkle 0.5s infinite alternate',
//     },
// };