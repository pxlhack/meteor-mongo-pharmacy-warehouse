// AppRoutes.js
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {CountriesRoutes} from './CountriesRoutes';
import {ManufacturersRoutes} from "./ManufacturersRoutes";
import {PharmaciesRoutes} from "./PharmaciesRoutes";
import RequestsRoutes from "./RequestsRoutes";
import {MedicinesRoutes} from "./MedicinesRoutes";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="countries/*" element={<CountriesRoutes/>}/>
            <Route path="manufacturers/*" element={<ManufacturersRoutes/>}/>
            <Route path="pharmacies/*" element={<PharmaciesRoutes/>}/>
            <Route path="requests/*" element={<RequestsRoutes/>}/>
            <Route path="medicines/*" element={<MedicinesRoutes/>}/>
        </Routes>
    );
};

export default AppRoutes;
