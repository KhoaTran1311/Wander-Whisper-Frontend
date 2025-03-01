import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Loading from "../components/Loading/Loading.jsx";
import Results from "../pages/Results.jsx";
import {AppProvider} from "../context/AppContext.jsx";


const AppRoutes = () => {
    return (
        <AppProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/l" element={<Loading/>} />
                <Route path="/r" element={<Results/>} />
            </Routes>
        </AppProvider>
    );
};

export default AppRoutes;

// TODO: Not found page
{/*<Route path="*" element={<NotFound />} />*/}
