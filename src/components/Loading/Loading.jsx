import React from "react";
import Stars from "../Background/Stars.jsx";
import LoadingWords from "./LoadingWords.jsx";

const Loading = () => {
    return (
        <div
            className={`fixed inset-0 overflow-hidden h-screen w-screen z-[-5] bg-zinc-950 select-none cursor-default 
            flex items-center justify-center`}
        >
            <div className="w-72 text-zinc-100 relative">
                <img className="blur-[2px]" src="/assets/backgrounds/loading/loading_spinning.gif" alt="loading spin"/>
                <div className="absolute top-3 -rotate-1 w-full h-full flex items-center justify-center">
                    <LoadingWords/>
                </div>
            </div>
            <Stars/>
        </div>
    )
};

export default Loading;