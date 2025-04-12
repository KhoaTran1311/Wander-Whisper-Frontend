import React, {useEffect, useRef} from "react";
import ImageInsertButton from "../PromptImage/ImageInsertButton.jsx";
import SettingButton from "../PromptSetting/SettingButton.jsx";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext.jsx";

const SearchForm = () => {
    const navigate = useNavigate();
    const { prompt, settings, setPrompt, resetMedia, images, setIsLoading, setPointsData } = useAppContext();
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

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const res = await fetch("http://127.0.0.1:8000/api/find_recommended_cities/");
            const data = await res.json();
            setPointsData(data)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const uploadConfig = async () => {
        try {
            const configData = { alpha: settings.alpha, beta: 1-settings.alpha };
            console.log(configData)
    
            const promptResponse = await fetch("http://127.0.0.1:8000/api/set_alpha_beta/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(configData),
            });

            const promptDataResponse = await promptResponse.json();
            if (!promptResponse.ok) {
                console.error("Prompt submission error:", promptDataResponse.error);
                return;
            }
            console.log(promptDataResponse.success); 
        } catch (error) {
            console.error("Error during submission:", error);
        }
    }

    const uploadImages = async () => {
        try {
            if (!images || images.length === 0) return;
            const formData = new FormData();
            
            images.forEach((image) => {
                formData.append("image", image);
            });

            const promptResponse = await fetch("http://127.0.0.1:8000/api/upload_image/", {
                method: "POST",
                body: formData,
            });
    
            const promptDataResponse = await promptResponse.json();
            if (!promptResponse.ok) {
                console.error("Prompt submission error:", promptDataResponse.error);
                return;
            }
            console.log(promptDataResponse.success); 
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    const uploadPrompt = async () => {
        try {
            const promptData = { prompt };

            const promptResponse = await fetch("http://127.0.0.1:8000/api/upload_prompt/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(promptData),
            });

            const promptDataResponse = await promptResponse.json();
            if (!promptResponse.ok) {
                console.error("Prompt submission error:", promptDataResponse.error);
                return;
            }
            console.log(promptDataResponse.success); 
        } catch (error) {
            console.error("Error during submission:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!prompt && images.length === 0)
            return;
    
        try {
            setIsLoading(true)
            await uploadConfig();
            if (images.length > 0) {
                await uploadImages();
            }
            if (prompt) {
                await uploadPrompt();
            }
            await fetchData();
            setIsLoading(false)
    
            resetMedia();
            if (textareaRef.current) {
                textareaRef.current.textContent = "";
            }
    
            navigate("/r");
    
        } catch (error) {
            console.error("Error during form submission:", error);
        }
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
        <form className="bg-zinc-700/50 backdrop-blur-2xl p-3 pb-1 rounded-3xl w-full text-left shadow-lg"
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
                    disabled={!prompt && images.length === 0}
                    className="flex h-11 px-4 items-center justify-center bg-zinc-50 text-zinc-950 rounded-full transition-colors select-none cursor-default hover:opacity-70 disabled:hover:opacity-100 focus-visible:outline-none focus-visible:outline-white disabled:bg-zinc-500 disable:hover:opacity-100 cursor-pointer"
                >
                    Let&#39;s Go!
                </button>
            </div>
        </form>
    );
}

export default SearchForm;
