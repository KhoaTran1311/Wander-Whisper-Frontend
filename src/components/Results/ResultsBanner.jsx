import React from "react";
import pointsData from "../../data/results_test.json";
import {useResultsContext} from "../../context/ResultsContext.jsx";
import {BackIcon, LeftArrow, RightArrow} from "../Navigation/NavIcons.jsx";

const ResultsBanner = () => {
    const { chosenCity, setChosenCity } = useResultsContext();

    return (
        <div
            className="bg-zinc-800/30 w-132 max-h-[80vh] absolute right-0 top-1/2 -translate-y-1/2 mr-16 rounded-2xl shadow-xl backdrop-blur-md p-6 border border-zinc-700/30 overflow-auto select-none"
        >
            {!chosenCity ? (
                <>
                    <h1 className="text-2xl mb-3 font-bold text-white text-2xl">Results</h1>
                    <div className="h-px bg-gradient-to-r from-zinc-700/50 via-zinc-500/50 to-zinc-700/50 mb-4"></div>

                    <table className="w-full">
                        <thead>
                        <tr className="text-zinc-400 text-sm">
                            <th className="text-left p-2 pt-0 text-lg font-medium">Destination</th>
                            <th></th>
                            <th className="text-right p-2 pt-0 text-lg font-medium">Our Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pointsData.map((point, index) => (
                            <tr
                                key={point.city_id}
                                onClick={() => setChosenCity({...point, currentCityIndex:index})}
                                className="border-b border-zinc-700/30 last:border-0 hover:scale-105 hover:bg-zinc-700/10 active:scale-107 active:bg-zinc-100/0 transition-[scale,color] cursor-pointer"
                            >
                                <td className="pl-2 py-2 text-white text-xl flex flex-row">{point.name}</td>
                                <td className="text-sm my-auto text-zinc-400">({point.country})</td>
                                <td className="pr-2 py-2 text-right text-xl font-mono text-emerald-400">
                                    {Number(point.score).toFixed(4)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <div
                        className="w-full pb-3 flex items-center justify-between">
                        <button
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center flex-shrink-0"
                            onClick={() => setChosenCity(null)}
                        >
                            <BackIcon/>
                        </button>
                        <h2 className="text-xl font-bold text-white flex items-center justify-center flex-grow mx-2">
                            {chosenCity.name}
                            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
                                {chosenCity.country}
                            </span>
                        </h2>
                        <div className="w-6 flex-shrink-0"/>
                    </div>
                    <div className="h-px bg-gradient-to-r from-zinc-700/50 via-zinc-500/50 to-zinc-700/50 mb-4"/>
                    <div className="p-4 pt-0 text-white/90">
                        <p className="text-sm leading-relaxed">
                            {chosenCity.description}
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-center mt-4">
                        <div className="flex items-center justify-center">
                            <button
                                className="cursor-pointer mr-2 h-10 rounded-full text-zinc-300 hover:scale-130 hover:text-zinc-50 transition-[scale,color] disabled:opacity-30 disabled:cursor-default  disabled:hover:scale-100 disabled:hover:scale-100 flex items-center justify-center"
                                onClick={() => setChosenCity({...pointsData[chosenCity.currentCityIndex - 1], currentCityIndex: chosenCity.currentCityIndex - 1})}
                                disabled={chosenCity.currentCityIndex === 0}
                            >
                                <LeftArrow />
                            </button>
                            <div className="flex items-center justify-center space-x-1">
                                {pointsData.map((city, index) => {
                                    return (
                                    <div
                                        key={index}
                                        className={`h-1 rounded-full transition-all duration-300 ${
                                            index === chosenCity.currentCityIndex
                                                ? "w-8 bg-zinc-50"
                                                : index === chosenCity.currentCityIndex - 1 || index === chosenCity.currentCityIndex + 1
                                                    ? "w-4 bg-zinc-500"
                                                    : "w-2 bg-zinc-700"
                                        }`}
                                    />
                                )})}
                            </div>

                            <button
                                className="ml-2 h-10 rounded-full text-zinc-300 hover:scale-130 hover:text-zinc-50 cursor-pointer transition-[scale,color] disabled:opacity-30 flex items-center justify-center disabled:cursor-default disabled:hover:scale-100 "
                                onClick={() => setChosenCity({...pointsData[chosenCity.currentCityIndex + 1], currentCityIndex: chosenCity.currentCityIndex + 1})}
                                disabled={chosenCity.currentCityIndex === pointsData.length - 1}
                            >
                                <RightArrow />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ResultsBanner;
