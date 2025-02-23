import { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export function ImageProvider({ children }) {
	const [images, setImages] = useState([]);
	const [open, setOpen] = useState(false);

	return (
		<ImageContext.Provider value={{ images, setImages, open, setOpen }}>
			{children}
		</ImageContext.Provider>
	);
}

export const useImageContext = () => useContext(ImageContext);