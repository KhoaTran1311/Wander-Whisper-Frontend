import React, { Suspense, useEffect, useRef, useState } from "react";
import WanderWhisperLogo from "/assets/logo/wander_whisper_logo.svg";
import Loading from "../components/Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";
import ResultsBanner from "../components/Results/ResultsBanner.jsx";
import { ResultsProvider } from "../context/ResultsContext.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const GlobeComponent = React.lazy(() => import("../components/Results/GlobeComponent"));


const Results = () => {
    const { isLoading } = useAppContext();
    const [ height, setHeight ] = useState(window.innerHeight);
    const [ width, setWidth ] = useState(window.innerWidth);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setHeight(containerRef.current.clientHeight);
                setWidth(containerRef.current.clientWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Suspense fallback={<Loading/>}>
            {isLoading ? <Loading/> : (
                <div className="fixed inset-0 overflow-hidden h-screen w-screen">
                    <button
                        className="fixed z-10 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
                        onClick={() => navigate("/")}
                    >
                        <img className="w-48 m-16 select-none"
                            draggable="false"
                            src={WanderWhisperLogo} alt="WanderWhisper Logo"
                        />
                    </button>
                        <div ref={containerRef} className="h-full w-full">
                            <ResultsProvider>
                                <GlobeComponent width={width} height={height}/>
                                <ResultsBanner/>
                            </ResultsProvider>
                        </div>
                </div>
            )}
        </Suspense>
    );
};

export default Results;