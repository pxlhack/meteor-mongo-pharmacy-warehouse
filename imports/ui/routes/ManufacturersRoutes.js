// ManufacturersRoutes.js

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {ManufacturersPage} from '../components/manufacturers/ManufacturersPage';
import {ManufacturerInfo} from "../components/manufacturers/ManufacturerInfo";

export const ManufacturersRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ManufacturersPage/>}/>
            <Route path=":id" element={<ManufacturerInfo/>}/>
        </Routes>
    );
};
