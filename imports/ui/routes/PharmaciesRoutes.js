import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PharmaciesPage} from "../components/pharmacies/PharmaciesPage";
import {PharmacyInfo} from "../components/pharmacies/PharmacyInfo";

export const PharmaciesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PharmaciesPage />} />
            <Route path=":id" element={<PharmacyInfo />} />
        </Routes>
    );
};

