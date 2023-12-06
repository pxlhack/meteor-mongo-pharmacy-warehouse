// RequestsList.js

import React from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {RequestsCollection} from "../../../api/collections/RequestsCollection";
import {MedicinesCollection} from "../../../api/collections/MedicinesCollection";
import {PharmaciesCollection} from "../../../api/collections/PharmaciesCollection";

export const RequestsList = () => {
    const {isLoading, requests, medicines, pharmacies} = useTracker(() => {
        const handle = Meteor.subscribe('requests');
        const isLoading = !handle.ready();
        const requestsData = RequestsCollection.find().fetch();
        const medicinesData = MedicinesCollection.find().fetch();
        const pharmaciesData = PharmaciesCollection.find().fetch();
        return {isLoading, requests: requestsData, medicines: medicinesData, pharmacies: pharmaciesData};
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    function renderPharmacyLink(request) {
        const foundPharmacy = findPharmacyById(request.pharmacyId);
        const pharmacyName = foundPharmacy ? foundPharmacy.name : "Unknown";

        return (
            <>
                {pharmacyName}
            </>
        );
    }

    function findPharmacyById(id) {
        return pharmacies.find((pharmacy) => pharmacy._id === id);
    }

    function renderMedicineLink(medicineItem) {
        const foundMedicine = findMedicineById(medicineItem.medicineId);
        const medicineName = foundMedicine ? foundMedicine.name : "Unknown";
        const medicineQuantity = medicineItem ? medicineItem.medicineQuantity : 0;

        return (
            <a href={`/medicines/${medicineItem.medicineId}`} className="hoverable-link">
                {medicineName || "Loading..."} ({medicineQuantity})
            </a>
        );
    }

    function findMedicineById(id) {
        return medicines.find((medicine) => medicine._id === id);
    }


    return (
        <div>
            <h2>List of requests</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Creation Date</th>
                    <th>Completion Date</th>
                    <th>Pharmacy</th>
                    <th>Medicine</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request, index) =>
                    (<tr key={request._id}>
                        <td>
                            <a href={`/requests/${request._id}`} className="hoverable-link">
                                {index + 1}
                            </a>
                        </td>
                        <td>
                            {request.creationDate}
                        </td>
                        <td>
                            {request.completionDate}
                        </td>
                        <td>
                            <a href={`/pharmacies/${request.pharmacyId}`} style={{textDecoration: "none"}}
                               className="hoverable-link">
                                {renderPharmacyLink(request)}
                            </a>
                        </td>
                        <td>
                            {request.medicineItems.map((medicineItem) => (
                                <li key={medicineItem.medicineId}>
                                    {renderMedicineLink(medicineItem)}
                                </li>
                            ))}
                        </td>
                    </tr>)
                )}
                </tbody>
            </table>
        </div>
    );
};
