import React from 'react';
import SearchForm from "../components/Prompt/Search/SearchForm.jsx";
import WanderWhisperLogo from '../assets/icons/wander_whisper_logo.svg';
import StarBackground from "../components/Background/StarBackground.jsx";
import ImageInsertForm from '../components/Prompt/PromptImage/ImageInsertForm.jsx';
import { ImageProvider } from '../context/ImageContext.jsx';
import { SettingProvider } from '../context/SettingContext.jsx';
import Settings from "../components/Prompt/PromptSetting/Settings.jsx";


const Home = () => {
    return (
            <div className="mx-auto flex flex-col w-full max-w-5xl h-screen min-h-fit items-center justify-between md:justify-center gap-15 p-10 lg:p-10 md:p-15 sm:p-15 xl:pb-30">
                <div className="flex flex-col select-none cursor-default item-start  justify-center w-full flex-initial px-4 pt-0 pl-8">
                    <img className="h-36 mt-0 xl:mt-2 md:mt-0 flex object-left mr-auto"
                        draggable="false"
                        src={WanderWhisperLogo} alt="WanderWhisper Logo"
                    />
                    <p className="flex my-auto mr-auto text-left text-3xl md:text-4xl text-zinc-400 w-full lg:w-1/2">
                        Your dream vacation awaits!
                    </p>
                </div>
                <div className="w-full flex">
                    <SettingProvider>
                        <ImageProvider>
                            <SearchForm/>
                            <ImageInsertForm/>
                            <Settings/>
                        </ImageProvider>
                    </SettingProvider>
                </div>
                <StarBackground loading={false}/>
            </div>
    );
};

export default Home;