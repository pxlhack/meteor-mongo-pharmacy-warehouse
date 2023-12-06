import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {Link, useParams} from 'react-router-dom';
import { RequestsCollection } from '../../../api/collections/RequestsCollection';
import { PharmaciesCollection } from '../../../api/collections/PharmaciesCollection';
import { MedicinesCollection } from '../../../api/collections/MedicinesCollection';

export const RequestInfo = () => {
    const { id } = useParams();
    const { isLoading, request, pharmacy, medicines } = useTracker(() => {
        const requestHandle = Meteor.subscribe('requests');
        const pharmacyHandle = Meteor.subscribe('pharmacies');
        const medicinesHandle = Meteor.subscribe('medicines');
        const isLoading = !requestHandle.ready() || !pharmacyHandle.ready() || !medicinesHandle.ready();

        const request = RequestsCollection.findOne({ _id: id });
        const pharmacy = request ? PharmaciesCollection.findOne({ _id: request.pharmacyId }) : null;
        const medicines = MedicinesCollection.find().fetch();
        return { isLoading, request, pharmacy, medicines };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!request) {
        return <div>Request not found</div>;
    }

    return (
        <div>
            <h2>Request Information</h2>
            <p>Creation Date: {request.creationDate}</p>
            {request.completionDate && <p>Completion Date: {request.completionDate}</p>}
            <p>
                Pharmacy: {pharmacy ? (
                <Link to={`/pharmacies/${pharmacy._id}`} style={{ textDecoration: 'none' }}>
                    {pharmacy.name}
                </Link>
            ) : (
                'Loading...'
            )}
            </p>


            <h3>Medicine Items:</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {request.medicineItems.map((item, index) => {
                    const medicine = medicines.find(m => m._id === item.medicineId);
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {medicine ? (
                                    <a href={`/medicines/${medicine._id}`} style={{ textDecoration: 'none' }}>
                                        {medicine.name}
                                    </a>
                                ) : (
                                    'Loading...'
                                )}
                            </td>
                            <td>{medicine ? medicine.price : 'Loading...'}</td>

                            <td>{item.medicineQuantity}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
