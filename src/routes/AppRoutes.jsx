import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Loading from "../pages/Loading.jsx";
// import NotFound from '../pages/NotFound';
// import Results from "../pages/Results.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/l" element={<Loading/>} />
            {/*<Route path="*" element={<NotFound />} />*/}
            {/*<Route path="/r" element={<Results />} />*/}
        </Routes>
    );
};

export default AppRoutes;
