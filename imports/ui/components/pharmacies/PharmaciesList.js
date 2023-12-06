import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PharmaciesCollection } from '../../../api/collections/PharmaciesCollection';

export const PharmaciesList = () => {
    const { isLoading, pharmacies } = useTracker(() => {
        const handle = Meteor.subscribe('pharmacies');
        const isLoading = !handle.ready();
        const pharmacies = PharmaciesCollection.find().fetch();
        return { isLoading, pharmacies };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of Pharmacies</h2>
            <ul>
                {pharmacies.map(pharmacy => (
                    <li key={pharmacy._id}>
                        <a href={`/pharmacies/${pharmacy._id}`} style={{ textDecoration: 'none' }}>
                            <h3>{pharmacy.name}</h3>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
