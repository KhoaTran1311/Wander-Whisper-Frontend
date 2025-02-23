import React, {useEffect, useState} from 'react';
import StarBackground from "../components/StarBackground.jsx";


function AnimatedDots() {
    const [step, setStep] = useState(0);
    const radiusRatio = 170/window.innerWidth*100;
    const numLinearSteps = 30;
    const numAngleSteps = 30;

    const angleSteps = Array.from({length: numAngleSteps}, (_, i) => -i * (180 / numAngleSteps)).reverse()

    const posStart = Array.from({length: numLinearSteps-7}, (_, i) => {
        return {
            "x": (50 - radiusRatio) / numLinearSteps * (i+8) + '%',
            "y": "50%"
        }
    });

    const posEnd = Array.from({length: numLinearSteps}, (_, i) => {
        return {
            "x": 50 + radiusRatio + (50 - radiusRatio) / numLinearSteps * i + '%',
            "y": "50%"
        }
    });

    const positions = [
        ...posStart,
        ...angleSteps.map(angle => {
            const rad = (Math.PI / 180) * angle;
            const x = 50 + radiusRatio * Math.cos(rad) + '%';
            const y = 50 - radiusRatio * Math.sin(rad) * 0.5 + '%';
            return { x, y };}),
        ...posEnd];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % positions.length);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="overflow-hidden">
            {[0, 2, 4].map(offset => (
                <div
                    key={offset}
                    className="absolute text-5xl font-bold overscroll-none overflow-hidden text-zinc-300"
                    style={{
                        left: positions[(step + offset) % positions.length].x,
                        top: positions[(step + offset) % positions.length].y,
                        transform: `translate(-50%, -50%)`,
                    }}
                >
                    .
                </div>
            ))}
        </div>
    );
}


const Loading = () => {
    return (
        <div className="h-screen">
            <div className="max-w-5xl w-full mx-auto w-full h-full">
                <div className="absolute text-5xl font-bold pl-8 text-zinc-300"
                     style={{top: '50%', left: '0%', transform: 'translate(0%, -50%)'}}>
                Loading
                </div>
                <AnimatedDots/>
                <StarBackground loading={true}/>
            </div>
        </div>
    );
};

export default Loading;