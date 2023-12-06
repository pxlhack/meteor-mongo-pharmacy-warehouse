// ManufacturersRoutes.js

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {ManufacturersPage} from '../components/manufacturers/ManufacturersPage';

export const ManufacturersRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ManufacturersPage/>}/>
        </Routes>
    );
};
