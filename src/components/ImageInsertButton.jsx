import React, { useState } from 'react';
import { ImageIcon } from './ImageIcons.jsx';

const ImageInsertButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="inline-flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
              className={`flex items-center h-11 pl-[7px] rounded-full transition-[width] border-gray-600 border cursor-pointer delay-200 duration-200 ${
                  isHovered ? 'w-42 bg-gray-700' : 'w-11 transition-all'
              }`}
            >
                <div className="mr-[7px]">
                    <ImageIcon/>
                </div>
                <div
                    className={`text-gray-300 text transition-all overflow-hidden text-nowrap text-left py-1 whitespace-nowrap ${
                        isHovered ? 'w-40 duration-500 delay-400' : 'w-0 delay-200 duration-200'
                    }`}
                >
                    Insert Images
                </div>
            </button>
    </span>
    );
};

export default ImageInsertButton;