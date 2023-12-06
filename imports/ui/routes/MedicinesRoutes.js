import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {MedicinesPage} from "../components/medicines/MedicinesPage";
import {MedicineInfo} from "../components/medicines/MedicineInfo";

export const MedicinesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MedicinesPage/>}/>
            <Route path=":id" element={<MedicineInfo/>}/>
        </Routes>
    );
};

