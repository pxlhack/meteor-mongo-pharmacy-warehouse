import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PharmaciesPage} from "../components/pharmacies/PharmaciesPage";

export const PharmaciesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PharmaciesPage />} />
        </Routes>
    );
};

