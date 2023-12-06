import {useTracker} from "meteor/react-meteor-data";
import {MedicinesCollection} from "../../../api/collections/MedicinesCollection";
import {ManufacturersCollection} from "../../../api/collections/ManufacturersCollection";
import React from "react";

export const MedicinesList = () => {
    const {isLoading, medicinesWithManufacturer} = useTracker(() => {
        const handleMedicines = Meteor.subscribe('medicines');
        const handleManufacturers = Meteor.subscribe('manufacturers');
        const isLoading = !handleMedicines.ready() || !handleManufacturers.ready();

        const medicines = MedicinesCollection.find().fetch();

        // Загрузка производителей и создание объекта medicinesWithManufacturer
        const manufacturers = ManufacturersCollection.find().fetch();
        const medicinesWithManufacturer = medicines.map(medicine => {
            const manufacturer = manufacturers.find(m => m._id === medicine.manufacturerId);
            return {
                ...medicine,
                manufacturerName: manufacturer ? manufacturer.name : 'Unknown'
            };
        });

        return {isLoading, medicinesWithManufacturer};
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of medicines</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Medicine Name</th>
                    <th>Manufacturer</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {medicinesWithManufacturer.map((medicine, index) => (
                    <tr key={medicine._id}>
                        <td>{index + 1}</td>
                        <td>
                            <a href={`/medicines/${medicine._id}`} style={{textDecoration: 'none'}}>
                                <h3>{medicine.name}</h3>
                            </a>
                        </td>
                        <td><a href={`/manufacturers/${medicine.manufacturerId}`} style={{textDecoration: 'none'}}>
                            {medicine.manufacturerName}
                        </a></td>
                        <td>{medicine.price}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
