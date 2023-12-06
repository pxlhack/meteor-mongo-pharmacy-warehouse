import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { PharmaciesCollection } from '../../../api/collections/PharmaciesCollection';

export const PharmacyInfo = () => {
    const { id } = useParams();
    const { isLoading, pharmacy } = useTracker(() => {
        const handle = Meteor.subscribe('pharmacies');
        const isLoading = !handle.ready();
        const pharmacy = PharmaciesCollection.findOne({ _id: id });
        return { isLoading, pharmacy };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!pharmacy) {
        return <div>Pharmacy not found</div>;
    }

    return (
        <div>
            <h2>{pharmacy.name}</h2>
            <p>Pharmacy Number: {pharmacy.phoneNumber}</p>
            <p>Address: {pharmacy.address}</p>
        </div>
    );
};
