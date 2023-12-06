// RequestsRoutes.js

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import RequestInfo from "../components/requests/RequestInfo";
import {RequestsPage} from "../components/requests/RequestsPage";

const RequestsRoutes = () => {
    return (<Routes>
        <Route path="/" element={<RequestsPage/>}/>
        <Route path=":id" element={<RequestInfo/>}/>
    </Routes>);
};

export default RequestsRoutes;
