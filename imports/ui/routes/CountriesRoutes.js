// CountriesRoutes.js

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {CountriesPage} from '../components/countries/CountriesPage';
import {CountryInfo} from '../components/countries/CountryInfo';

export const CountriesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CountriesPage/>}/>
            <Route path=":id" element={<CountryInfo/>}/>
        </Routes>
    );
};
