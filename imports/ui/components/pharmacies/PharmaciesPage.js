import React from 'react';
import '../../styles/pharmacies-page.css';
import {PharmaciesList} from "./PharmaciesList";
import {CreatePharmacy} from "./CreatePharmacy";

export const PharmaciesPage = () => {
    return (
        <div>
            <CreatePharmacy/>
            <PharmaciesList/>
        </div>
    );
}

