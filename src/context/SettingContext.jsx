import React, { createContext, useState, useContext } from 'react';

const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        alpha: 0.5,
        maxResults: 10,
    });
	const [open, setOpen] = useState(false);

    return (
        <SettingContext.Provider value={{ settings, setSettings, open, setOpen }}>
            {children}
        </SettingContext.Provider>
    );
};

export const useSettingContext = () => useContext(SettingContext);
