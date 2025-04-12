import React, { useState, useEffect } from "react";
import { CloseIcon } from "../../Navigation/NavIcons.jsx";
import { useHomeContext } from "../../../context/HomeContext.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";

const Settings = () => {
    const { openSettings, setOpenSettings } = useHomeContext();
    const { settings, setSettings } = useAppContext();
    const [ openInfo, setOpenInfo ] = useState(false);

    const handleNumberOfResultsChange = (event) => {
        const value = Number(event.target.value);
        setSettings((prev) => ({...prev, maxResults: value > 0 ? value : 1}));
    }

    useEffect(() => {
            const timer = setTimeout(() => {
                setOpenInfo(false);
            }, 4000);
    
            return () => clearTimeout(timer);
        }, [openInfo]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-xl transition-opacity p-20 ${openSettings ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={() => setOpenSettings(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex flex-col bg-zinc-900 border border-zinc-700/30 h-fill w-104 sm:w-124 md:w-160 rounded-2xl p-6 gap-3 shadow-xl text-white `}
            >
                <div className="flex flex-row justify-between pb-3">
                    <h1 className="text-2xl font-bold select-none cursor-default">
                        Settings
                    </h1>
                    <button 
                        onClick={() => setOpenSettings(false)}
                        className="text-zinc-300 cursor-pointer hover:text-zinc-50 hover:scale-115 active:scale-120 transition-transform"
                    >
                        <CloseIcon/>
                    </button>
                </div>
                <div
                    className="flex flex-col divide-y-1 divide-zinc-800 p-3 border border-xl border-zinc-600/30 rounded-lg">
                    <div className="pb-3">
                        <div className="flex flex-row justify-between">
                            <label className="flex justify-between font-medium mb-1 cursor-default select-none">
                                Alpha
                            </label>
                            <div className="relative">
                                <div
                                    onClick={(prev) => setOpenInfo(!openInfo)} 
                                    className="flex justify-center font-medium text-[10px] border rounded-full h-4 w-4 font-mono text-zinc-400 hover:text-zinc-300 cursor-pointer select-none"
                                >
                                    <span className="my-auto">i</span>
                                </div>
                                {
                                    openInfo && 
                                    (<div className="absolute bg-zinc-300 text-black text-xs rounded mt-3 py-1 px-2 z-50 shadow-md transition-opacity -right-3 whitespace-normal sm:whitespace-nowrap cursor-default select-none">
                                        The higher the alpha, the more images is prioritized over text when searching
                                        <div className="absolute right-3 -top-1 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-zinc-300"/>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={settings.alpha}
                                onChange={(event) => setSettings((p) => ({...p, alpha: Number(event.target.value)}))}
                                className="range-input w-full relative z-10 px-0.5 cursor-pointer"
                            />
                            <div className="absolute top-1/2 left-0 w-full flex px-1 justify-between transform -translate-y-1/2 pointer-events-none z-5">
                                {Array.from({ length: 11 }, (_, i) => {
                                    if (i%5===0) {
                                        return (
                                            <div
                                                key={i}
                                                className="w-[3px] h-3 bg-zinc-700"
                                            />
                                        )
                                    }
                                    return (
                                        <div
                                            key={i}
                                            className="w-px relative top-0.5 h-2 bg-zinc-700"
                                        />
                                    )
                                })}
                            </div>
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 transform -translate-y-1/2 pointer-events-none z-0"/>
                        </div>
                        <div className="flex justify-between text-xs px-0.5 cursor-default select-none">
                            <span>0</span>
                            <span>0.5</span>
                            <span>1</span>
                        </div>
                    </div>
                    {/*<div className="flex justify-between  pt-3 cursor-default select-none">*/}
                    {/*    <div className="flex flex-col justify-between">*/}
                    {/*        <label className="font-medium mb-1">*/}
                    {/*            Number of Results*/}
                    {/*        </label>*/}
                    {/*        <p className="text-xs text-zinc-500">*/}
                    {/*            Number of cities to search*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="flex items-center bg-zinc-300/10 rounded-md overflow-hidden shadow-xl inset-shadow-sm inset-shadow-zinc-400/50">*/}
                    {/*        <button*/}
                    {/*            disabled={settings.maxResults <= 1}*/}
                    {/*            onClick={() => setSettings((p) => ({...p, maxResults: p.maxResults - 1}))}*/}
                    {/*            className="p-2 sm:px-3 h-full cursor-pointer text-zinc-300 disabled:cursor-not-allowed"*/}
                    {/*        >*/}
                    {/*            -*/}
                    {/*        </button>*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            value={settings.maxResults}*/}
                    {/*            onChange={handleNumberOfResultsChange}*/}
                    {/*            className="sm:w-10 w-8 text-center outline-none"*/}
                    {/*        />*/}
                    {/*        <button*/}
                    {/*            onClick={() => setSettings((p) => ({...p, maxResults: p.maxResults + 1}))}*/}
                    {/*            className="p-2 sm:px-3 h-full cursor-pointer text-zinc-300"*/}
                    {/*        >*/}
                    {/*            +*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Settings;