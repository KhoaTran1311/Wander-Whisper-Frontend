import React, {useEffect, useRef, useState} from 'react';
import ImageInsertButton from "./ImageInsertButton.jsx";
import {Link} from "react-router-dom";

const SearchForm = () => {
    const [prompt, setPrompt] = useState("");
    const textareaRef = useRef(null);

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
        if (textareaRef.current) {
            adjustTextareaHeight(textareaRef.current);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            adjustTextareaHeight(textareaRef.current);
        }
    }, [prompt]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt)
            return
        console.log(prompt);
        setPrompt("");
        if (textareaRef.current) {
            textareaRef.current.textContent = "";
        }
    }

    useEffect(() => {
        // Focus the textarea on component mount
        textareaRef.current?.focus();
    }, []);


    return (
        <form className="bg-gray-700/70 backdrop-blur-2xl px-3 py-1 rounded-3xl w-full text-left" onSubmit={handleSubmit}>
            <textarea
                className="text relative flex m-2 pr-4 items-starts pl-1 focus:outline-none min-h-12 min-w-0 max-h-[25dvh]
                            w-full overflow-x-clip overflow-y-auto caret-gray-50 align-bottom appearance-auto custom-scrollbar"
                value={prompt}
                style={{ resize: 'none' }}
                ref={textareaRef}
                onChange={handlePromptChange}
                placeholder={"Describe your ideal trip..."}
            />
            <div className="flex mb-2 mt-1 items-center justify-between h-fit">
                <ImageInsertButton/>
                <div className="flex">
                    <button
                        type="submit"
                        disabled={!prompt}
                        className="flex h-11 px-4 items-center justify-center bg-gray-50 text-gray-950 rounded-full transition-colors hover:opacity-70 disabled:hover:opacity-100 focus-visible:outline-none focus-visible:outline-white disabled:bg-gray-500 disable:hover:opacity-100 cursor-pointer"
                    >
                        <Link
                            to='/l'
                        >
                            Let&#39;s Go!
                        </Link>
                    </button>

                </div>
            </div>
        </form>
    );
}

export default SearchForm;
