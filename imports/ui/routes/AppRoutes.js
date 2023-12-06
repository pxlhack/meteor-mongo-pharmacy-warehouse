// AppRoutes.js
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {CountriesRoutes} from './CountriesRoutes';
import {ManufacturersRoutes} from "./ManufacturersRoutes";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="countries/*" element={<CountriesRoutes/>}/>
            <Route path="manufacturers/*" element={<ManufacturersRoutes/>}/>
        </Routes>
    );
};

export default AppRoutes;
