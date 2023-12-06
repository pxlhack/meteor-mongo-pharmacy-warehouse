import React from "react";
import {CreateMedicine} from "./CreateMedicine";
import {MedicinesList} from "./MedicinesList";


export const MedicinesPage = () => {
    return (
        <div>
            <CreateMedicine/>
            <MedicinesList/>
        </div>
    );
}