import React, { useState } from 'react';
import { ImageIcon, ImageInsertedIcon } from './ImageIcons.jsx';
import { useHomeContext } from "../../../context/HomeContext.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";

const ImageInsertButton = React.memo(() => {
    const { openImageInsert, setOpenImageInsert } = useHomeContext();
    const { images } = useAppContext();
    const [ isHovered, setIsHovered ] = useState(false);


    const calculateWidth = () => {
        const baseWidth = 13; // base width when hovered
        let num;

        if ( images.length === 0 )
            num = 0;
        else if ( images.length < 10 )
            num = 1;
        else
            num = 2;
        
        const isZero = num !== 0;
        const additionalWidth = isZero * 3 + num * 1.5 + 31;
        return isHovered && !openImageInsert ? baseWidth + additionalWidth : 11;
    }

    return (
        <span
            className="inline-flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                className={`flex items-center h-11 w-11 p-[9px] rounded-full transition-[width] border-zinc-600 border cursor-pointer duration-200 delay-250 active:bg-zinc-500 hover:bg-zinc-600`}
                type="button"
                style={{ width: `calc(var(--spacing) * ${calculateWidth()})` }}
                onClick={() => setOpenImageInsert(true)}
            >
                <div className="mr-[10px] text-zinc-400">
                    {!images.length ? <ImageIcon/> : <ImageInsertedIcon/>}
                </div>
                <div
                    className={`text-zinc-300 text transition-[width] overflow-hidden text-nowrap text-left py-1 whitespace-nowrap ${
                        isHovered ? "w-40 duration-500 delay-400" : "w-0 delay-200 duration-200"
                    }`}
                >
                    {!images.length ? "Insert Images" : "Added " + images.length + " Image" + (images.length > 1 ? "s" : "")}
                </div>
            </button>
        </span> 
    );
});

ImageInsertButton.displayName = "ImageInsertButton";

export default ImageInsertButton;