import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [ images, setImages ] = useState([]);
    const [ settings, setSettings ] = useState({
        alpha: 0.5,
        maxResults: 10,
    });
    const [ prompt, setPrompt ] = useState("");
    const [ location, setLocation ] = React.useState({ lat: 0, lng: 0 });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ pointsData, setPointsData ] = useState([]);

    useEffect(() => {
        return () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getLocSuccess, getLocError);
            } else {
                console.log("Geolocation not supported");
            }
        };
    }, []);

    const getLocSuccess = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ lat:latitude, lng:longitude });
    }

    const getLocError = () => {
        console.log("Unable to retrieve your location");
    }

    const resetMedia = () => {
        setImages([]);
        setPrompt("")
        setSettings({
            alpha: 0.5,
            maxResults: 10,
        })
    }

    return (
        <AppContext.Provider value={{ images, setImages, settings, setSettings, prompt, setPrompt, location, setLocation, resetMedia, isLoading, setIsLoading, pointsData, setPointsData }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);