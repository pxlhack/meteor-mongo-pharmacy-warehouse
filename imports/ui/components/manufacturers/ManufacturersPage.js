import React from 'react';
import {ManufacturersList} from "./ManufacturersList";
import {CreateManufacturer} from "./CreateManufacturer";

export const ManufacturersPage = () => {
    return (<div>
        <CreateManufacturer/>
        <ManufacturersList/>
    </div>);
}

