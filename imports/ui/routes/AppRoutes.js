// AppRoutes.js
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {CountriesRoutes} from './CountriesRoutes';
import {ManufacturersRoutes} from "./ManufacturersRoutes";
import {PharmaciesRoutes} from "./PharmaciesRoutes";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="countries/*" element={<CountriesRoutes/>}/>
            <Route path="manufacturers/*" element={<ManufacturersRoutes/>}/>
            <Route path="pharmacies/*" element={<PharmaciesRoutes/>}/>
        </Routes>
    );
};

export default AppRoutes;
