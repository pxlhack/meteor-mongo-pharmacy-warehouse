// AppRoutes.js
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {CountriesRoutes} from './CountriesRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="countries/*" element={<CountriesRoutes/>}/>
        </Routes>
    );
};

export default AppRoutes;
