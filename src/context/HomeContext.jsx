import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
    const [openImageInsert, setOpenImageInsert] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <HomeContext.Provider value={{ openImageInsert, setOpenImageInsert, openSettings, setOpenSettings }}>
            {children}
        </HomeContext.Provider>
    );
}

export const useHomeContext = () => useContext(HomeContext);