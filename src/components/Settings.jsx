import React, { useState } from 'react';
import { useSettingContext } from '../context/SettingContext';
import { CloseIcon } from './NavIcons.jsx';

const Settings = () => {
    const { settings, open, setOpen } = useSettingContext();
    const [alpha, setAlpha] = useState(0.5);
    const [numberOfResults, setNumberOfResults] = useState(10);

    const handleAlphaChange = (event) => {
        setAlpha(Number(event.target.value)); 
    };

    const handleNumberOfResultsChange = (event) => {
        const value = Number(event.target.value);
        setNumberOfResults(value > 0 ? value : 1);
    }

    const handleDecrement = () => {
        setNumberOfResults((prev) => prev - 1);
    };

    const handleIncrement = () => {
        setNumberOfResults((prev) => prev + 1);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-xl transition-opacity p-20 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex flex-col bg-zinc-900 border border-zinc-700 h-fill w-104 sm:w-124 md:w-160 rounded-3xl p-6 gap-3 shadow-xl`}
            >
                <div className='flex flex-row justify-between pb-3'>
                    <h1 className='text-2xl select-none cursor-default'>
                        Settings
                    </h1>
                    <button onClick={() => setOpen(false)}>
                        <div className='text-zinc-300 cursor-pointer hover:text-zinc-50 hover:scale-115 active:scale-120 active:bg-zinc-700 transition-transform rounded-full'>
                            <CloseIcon/>
                        </div>
                    </button>
                </div>
                <div className='flex flex-col divide-y-1 divide-zinc-800 p-3 border border-xl border-zinc-600 rounded-lg'>
                    <div className='pb-3'>
                        <label className='flex justify-between font-medium mb-1 cursor-default select-none'>
                            Alpha
                        </label>
                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={alpha}
                                onChange={handleAlphaChange}
                                className="range-input w-full relative z-10 px-0.5"
                            />
                            <div className="absolute top-1/2 left-0 w-full flex px-1 justify-between transform -translate-y-1/2 pointer-events-none z-5">
                                {Array.from({ length: 3 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="w-px h-3 bg-zinc-700"
                                    />
                                ))}
                            </div>
                            <div className='absolute top-1/2 left-0 w-full h-1 bg-zinc-800 transform -translate-y-1/2 pointer-events-none z-0'/>
                        </div>
                        <div className="flex justify-between text-xs px-0.5 cursor-default select-none">
                            <span>0</span>
                            <span>0.5</span>
                            <span>1</span>
                        </div>
                    </div>


                    <div className="flex justify-between  pt-3">
                        <div className="flex flex-col justify-between cursor-default select-none">
                            <label className='font-medium mb-1'>
                                Number of Results
                            </label>
                            <p className='text-xs text-zinc-500'>
                                Number of destinations to seek
                            </p>
                        </div>
                        <div
                            className="flex items-center bg-zinc-700 rounded-md  overflow-hidden shadow-xl inset-shadow-sm inset-shadow-zinc-400/50">
                            <button
                                disabled={numberOfResults <= 1}
                                onClick={handleDecrement}
                                className="p-2 px-3 h-full cursor-pointer text-zinc-300 disabled:cursor-not-allowed"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={numberOfResults}
                                onChange={handleNumberOfResultsChange}
                                className="w-10 text-center outline-none"
                            />
                            <button
                                onClick={handleIncrement}
                                className="p-2 px-3 h-full cursor-pointer text-zinc-300"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;