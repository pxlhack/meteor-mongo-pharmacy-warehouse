import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {MedicinesCollection} from '../../../api/collections/MedicinesCollection';
import {ManufacturersCollection} from '../../../api/collections/ManufacturersCollection';

export const MedicineInfo = () => {
    const {id} = useParams();
    const {isLoading, medicine, manufacturer} = useTracker(() => {
        const medicineHandle = Meteor.subscribe('medicines');
        const manufacturerHandle = Meteor.subscribe('manufacturers');
        const isLoading = !medicineHandle.ready() || !manufacturerHandle.ready();

        const medicine = MedicinesCollection.findOne({_id: id});
        const manufacturer = medicine ? ManufacturersCollection.findOne({_id: medicine.manufacturerId}) : null;

        return {isLoading, medicine, manufacturer};
    });

    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!medicine) {
        return <div>Medicine not found</div>;
    }

    const handleDeleteMedicine = async () => {
        try {
            await Meteor.call('medicines.delete', id);

            navigate('/medicines');

        } catch (error) {
        }
    }

    return (
        <div>
            <h2>{medicine.name}</h2>
            <p>Price: {medicine.price}</p>
            {manufacturer && (
                <p>
                    Manufacturer: <Link to={`/manufacturers/${manufacturer._id}`}>{manufacturer.name}</Link>
                </p>
            )}
            <button onClick={handleDeleteMedicine}>Delete</button>
        </div>
    );
};
