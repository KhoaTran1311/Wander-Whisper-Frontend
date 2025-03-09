import React, {useEffect, useRef} from "react";
import ImageInsertButton from "../PromptImage/ImageInsertButton.jsx";
import SettingButton from "../PromptSetting/SettingButton.jsx";
import { useNavigate } from "react-router-dom";
import {useAppContext} from "../../../context/AppContext.jsx";

const SearchForm = () => {
    const navigate = useNavigate();
    const { prompt, setPrompt, resetMedia } = useAppContext();
    const textareaRef = useRef(null);

    const adjustTextareaHeight = (textarea) => {
        // auto increase text area height
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight) + "px";
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
        if (textareaRef.current) {
            adjustTextareaHeight(textareaRef.current);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt)
            return
        console.log(prompt); // TODO: link to backend`11
        resetMedia();
        if (textareaRef.current) {
            textareaRef.current.textContent = "";
        }
        navigate("/r");
    }

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
        } 
    }

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);


    return (
        <form className="bg-zinc-700/50 backdrop-blur-2xl p-3 pb-1 rounded-3xl w-full text-left"
            onSubmit={handleSubmit}
        >
            <textarea
                className="text relative flex m-2 pr-4 items-starts pl-1 focus:outline-none min-h-12 min-w-0 max-h-[25dvh]
                            w-full overflow-x-clip overflow-y-auto caret-zinc-50 align-bottom appearance-auto custom-v-scrollbar text-zinc-50"
                value={prompt}
                style={{ resize: "none" }}
                ref={textareaRef}
                onChange={handlePromptChange}
                onKeyDown={handleOnKeyDown}
                placeholder={"Describe your ideal trip..."}
            />
            <div className="flex mb-2 mt-1 items-center justify-between h-fit">
                <div className="flex flex-row gap-2">
                    <SettingButton/>
                    <ImageInsertButton/>
                </div>
                <button
                    type="submit"
                    disabled={!prompt}
                    className="flex h-11 px-4 items-center justify-center bg-zinc-50 text-zinc-950 rounded-full transition-colors select-none cursor-default hover:opacity-70 disabled:hover:opacity-100 focus-visible:outline-none focus-visible:outline-white disabled:bg-zinc-500 disable:hover:opacity-100 cursor-pointer"
                >
                    Let&#39;s Go!
                </button>
            </div>
        </form>
    );
}

export default SearchForm;
