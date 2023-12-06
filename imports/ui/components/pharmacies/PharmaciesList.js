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
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Pharmacy Name</th>
                </tr>
                </thead>
                <tbody>
                {pharmacies.map((pharmacy, index) => (
                    <tr key={pharmacy._id}>
                        <td>{index + 1}</td>
                        <td>
                            <a href={`/pharmacies/${pharmacy._id}`} style={{ textDecoration: 'none' }}>
                                <h3>{pharmacy.name}</h3>
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
