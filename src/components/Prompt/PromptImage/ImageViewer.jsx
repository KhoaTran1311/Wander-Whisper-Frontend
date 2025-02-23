import React, { useState, useEffect } from 'react';
import { TrashIcon } from './ImageIcons.jsx';
import { useImageContext }  from '../../../context/ImageContext.jsx';

const ImageViewer = () => {
    const { images, setImages } = useImageContext();
    const [showImages, setShowImages] = useState(false);

    useEffect(() => {
        if (images.length > 0) {
            const timer = setTimeout(() => {
                setShowImages(true);
            }, 150); 
            return () => clearTimeout(timer);
        } else {
            setShowImages(false);
        }
    }, [images.length]);

    const handleDelete = (index) => {
        setImages(images.filter((_, i) => i !== index));
    }

    return (
        <div className={`bg-zinc-500/30 w-96 sm:w-112 md:w-142 rounded-b-xl transition-[height,padding] border-zinc-700 ${images.length ? "h-32 p-4 shadow-xl border border-t-0 delay-150" : "h-0 p-0 delay-0"}`}>
            <div className='custom-h-scrollbar overflow-x-auto overflow-y-hidden'>
                <div className="grid grid-flow-col auto-cols-max gap-x-1 whitespace-nowrap">
                    {images.map((image, index) => (
                        <div key={index} className={`relative inline-block m-1 transition-opacity duration-300 
                            ${showImages ? 'opacity-100' : 'opacity-0'}`}>
                            <img
                                src={image}
                                alt={`Uploaded ${index}`}
                                className="h-20 object-cover"
                            />
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute inset-0 flex items-center justify-center bg-red-500/60 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-sm cursor-pointer active:bg-red-500"
                            >
                                <div className='text-red-50'>
                                    <TrashIcon/>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageViewer;
        