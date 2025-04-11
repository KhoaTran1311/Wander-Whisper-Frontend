import React from 'react';

const PromptBackground = () => {
    return (
        <div
            className={`fixed inset-0 overflow-hidden h-screen w-screen z-[-5] bg-zinc-950 select-none cursor-default blur-xl`}
        >
            <img
                className="w-1/1 xl:w-2/3 lg:w-5/6 sm:w-7/6 xs:w-6/6 left-1/5 xl:left-2/5 lg:left-1/4 sm:left-1/8
                    top-1/2 xl:top-1/3 lg:top-2/5 aspect-square absolute z-[-3]"
                src="/assets/backgrounds/earth/bg_earth.png"
                alt="Earth background"
            />
        </div>
    )
};

export default PromptBackground;
