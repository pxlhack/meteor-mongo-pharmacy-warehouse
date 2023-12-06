import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {MedicinesPage} from "../components/medicines/MedicinesPage";

export const MedicinesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MedicinesPage/>}/>
        </Routes>
    );
};

