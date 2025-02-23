import React, { useState } from 'react';
import { SettingIcon } from './SettingIcons.jsx';
import { useSettingContext }  from '../context/SettingContext.jsx';

const SettingButton = () => {
    const { setOpen } = useSettingContext();

    const handleImageInsertClick = () => {
        setOpen(true);
    }

    return (
        <div className="relative group">
            <button
                className={`h-11 w-11 pl-[9px] text-zinc-400 rounded-full border-zinc-600 border cursor-pointer duration-200 active:bg-zinc-500 hover:bg-zinc-600`}
                type="button"
                onClick={handleImageInsertClick}
            >
                <SettingIcon/>
            </button>
            <div className="absolute bottom-full mb-2 left-3/4 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md bg-black text-white text-xs rounded py-1 px-2">
                Settings
                <div className="absolute left-5.5 -bottom-0.5 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"/>
            </div>
        </div>
    );
};

export default SettingButton;