import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {CountriesPage} from '../components/countries/CountriesPage';
import CountryDetail from '../components/countries/CountryDetail';

const CountriesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CountriesPage/>}/>
            <Route path=":id" element={<CountryDetail/>}/>
        </Routes>
    );
};

export default CountriesRoutes;
