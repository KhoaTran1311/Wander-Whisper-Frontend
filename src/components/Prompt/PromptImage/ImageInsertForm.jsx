import React, { useState } from 'react';
import { CloseIcon } from "../../Navigation/NavIcons.jsx";
import ImageViewer from "./ImageViewer.jsx";
import { ImagePlusIcon } from "./ImageIcons.jsx";
import {useHomeContext} from "../../../context/HomeContext.jsx";
import {useAppContext} from "../../../context/AppContext.jsx";

const ImageInsertForm = () => {
	const { openImageInsert, setOpenImageInsert } = useHomeContext();
    const { images, setImages } = useAppContext();
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...newImages]);
        setIsDragOver(false);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    }

    return (
        <div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 transition-opacity backdrop-blur-xl p-20 ${openImageInsert ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			onClick={() => setOpenImageInsert(false)}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex items-center flex-col justify-start h-106"
			>
				<div className={`flex flex-col bg-zinc-900 border border-zinc-700 transition-[height] ${!images.length ? "h-98" : "h-78"} w-112 sm:w-132 md:w-168 rounded-3xl p-6 gap-3 shadow-xl`}>
					<div className="flex flex-row justify-between pb-3">
						<h1 className="text-2xl select-none cursor-default">
							Images
						</h1>
						<button onClick={() => setOpenImageInsert(false)} className="text-zinc-300 cursor-pointer hover:text-zinc-50 hover:scale-115 active:scale-120 active:bg-zinc-700 transition-transform rounded-full">
							<CloseIcon/>
						</button>
					</div>
					<div 
						className={`flex flex-col justify-center items-center hover:bg-zinc-700/10 gap-4 p-4 border-dashed rounded-xl w-full transition-all 
							${!images.length ? "h-72" : "h-52"} 
							${isDragOver 
							? "border-zinc-400 border-4 border-solid ease-in inset-shadow-sm inset-shadow-blue-500 bg-blue-900/30 scale-102" 
							: "bg-zinc-900/40 border-zinc-800 border-2"}`}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={() => setIsDragOver(false)}
						>
						<label 
							className="flex flex-col justify-center items-center gap-4 w-full h-full cursor-pointer"
						>
							<input 
							type="file" 
							multiple 
							className="hidden"
							onChange={(event) => {
								const files = Array.from(event.target.files);
								const newImages = files.map(file => URL.createObjectURL(file));
								setImages([...images, ...newImages]);
							}}
							/>
							<div className={`rounded-full transition-colors ${isDragOver ? "bg-blue-800" : "bg-zinc-800"} p-3 shadow-sm`}>
								<div className={`${isDragOver ? "text-blue-500" : "text-zinc-500"}`}>
									<ImagePlusIcon/>
								</div>
							</div>
							<div className="select-none transition-colors text-center">
								<p className={`text-md ${isDragOver ? "text-blue-200" : "text-zinc-200"}`}>Click to select</p>
								<p className={`text-sm ${isDragOver ? "text-blue-500" : "text-zinc-500"}`}>
									or drag and drop file here
								</p>
							</div>
						</label>
					</div>
				</div>
				<ImageViewer/>
			</div>
        </div>
    )
}

export default ImageInsertForm;