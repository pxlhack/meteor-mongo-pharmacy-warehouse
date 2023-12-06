import React from "react";
import {CreateMedicine} from "./CreateMedicine";
import {useTracker} from "meteor/react-meteor-data";
import {MedicinesCollection} from "../../../api/collections/MedicinesCollection";

export const MedicinesList = () => {
    const {isLoading, medicines} = useTracker(() => {
        const handle = Meteor.subscribe('medicines');
        const isLoading = !handle.ready();
        const medicines = MedicinesCollection.find().fetch();
        return {isLoading, medicines};
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of medicines</h2>
            <ul>
                {medicines.map(medicine => (
                    <li key={medicine._id}>
                        <a href={`/medicines/${medicine._id}`} style={{textDecoration: 'none'}}>
                            <h3>{medicine.name}</h3>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const MedicinesPage = () => {
    return (
        <div>
            <CreateMedicine/>
            <MedicinesList/>
        </div>
    );
}