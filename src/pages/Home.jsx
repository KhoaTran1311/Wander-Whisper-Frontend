import React from 'react';
import SearchForm from "../components/SearchForm.jsx";
import WanderWhisperLogo from '../assets/wander_whisper_logo.svg';
import StarBackground from "../components/StarBackground.jsx";


const Home = () => {
    return (
        <div className="h-screen">
            <div className="max-w-5xl w-full mx-auto flex flex-col w-full h-full items-center justify-between sm:justify-center gap-25 p-10 pb-10 sm:p-10 xl:pb-30 sm:pb-30">
                <div className="flex flex-col item-start gap-3 justify-center w-full px-4 flex-initial pt-0 pl-8">
                    <img className="h-36 mt-0 xl:mt-2 flex object-left mr-auto"
                         src={WanderWhisperLogo} alt="WanderWhisper Logo"/>
                    <div className="flex my-auto mr-auto text-left text-3xl md:text-4xl text-gray-400 w-full lg:w-1/2">
                        <p>
                            Your dream vacation awaits!
                            {/*Upload an images, describe your ideal trip, and let the adventure begin!*/}
                        </p>
                    </div>
                </div>

                <div className="w-full flex">
                    <SearchForm/>
                </div>
                <StarBackground loading={false}/>
            </div>
        </div>
    );
};

export default Home;