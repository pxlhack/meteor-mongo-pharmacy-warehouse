import React, {useEffect, useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {PharmaciesCollection} from "../../../api/collections/PharmaciesCollection";
import {MedicinesCollection} from "../../../api/collections/MedicinesCollection";

export const CreateRequest = () => {
    const {pharmacies} = useTracker(() => {
        const handle = Meteor.subscribe("pharmacies");
        const isLoading = !handle.ready();
        const pharmacies = PharmaciesCollection.find().fetch();
        return {pharmacies, isLoading};
    });

    const {medicines} = useTracker(() => {
        const handle = Meteor.subscribe("medicines");
        const isLoading = !handle.ready();
        const medicines = MedicinesCollection.find().fetch();
        return {medicines, isLoading};
    });

    const [pharmacyId, setPharmacyId] = useState(
        pharmacies.length > 0 ? pharmacies[0]._id : ""
    );

    const [medicineId, setMedicineId] = useState(
        medicines.length > 0 ? medicines[0]._id : ""
    );

    const [medicineQuantity, setMedicineQuantity] = useState(1);
    const [selectedMedicineItems, setSelectedMedicineItems] = useState([]);
    const [availableMedicines, setAvailableMedicines] = useState(medicines);

    useEffect(() => {
        setMedicineQuantity(1);
    }, [medicineId]);

    useEffect(() => {
        const updatedAvailableMedicines = medicines.filter(
            (medicine) => !selectedMedicineItems.some((selectedMedicine) => selectedMedicine.medicineId === medicine._id)
        );

        if (!arraysEqual(updatedAvailableMedicines, availableMedicines)) {
            setAvailableMedicines(updatedAvailableMedicines);
        }
    }, [medicines, selectedMedicineItems, availableMedicines]);

    function arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }


    const handlePharmacyChange = (event) => {
        setPharmacyId(event.target.value);
    };

    const handleMedicineChange = (event) => {
        setMedicineId(event.target.value);
        console.log("handleMedicineChange ", medicineId)
    };


    const handleMedicineQuantityChange = (event) => {
        let quantity = parseInt(event.target.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        } else if (quantity > 100) {
            quantity = 100;
        }
        setMedicineQuantity(quantity);
    };

    const handleAddMedicine = () => {
        console.log(medicineId)
        console.log(medicineQuantity)
        if (medicineId && medicineQuantity) {
            const selectedMedicineItem = {
                medicineId,
                medicineQuantity,
            };


            setSelectedMedicineItems([...selectedMedicineItems, selectedMedicineItem]);

            const updatedAvailableMedicines = availableMedicines.filter(
                (medicine) => medicine._id !== selectedMedicineItem.medicineId
            );

            setMedicineQuantity(1);
            setAvailableMedicines(updatedAvailableMedicines);
            setMedicineId(availableMedicines[0]._id);
        }
    };


    const [creationDate, setCreationDate] = useState("");


    const [completionDate, setCompletionDate] = useState("");


    const handleCreationDateChange = (event) => {
        setCreationDate(event.target.value);
    };

    const handleCompletionDateChange = (event) => {
        setCompletionDate(event.target.value);
    };


    const handleCreateRequest = (event) => {
        event.preventDefault();

        const newRequest = {
            creationDate,
            completionDate,
            pharmacyId,
            medicineItems: selectedMedicineItems,
        };
        console.log("Request Object:", newRequest);

        Meteor.call("requests.insert", newRequest, (error) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log("Request inserted successfully");
            }
        });

        setCreationDate("");
        setCompletionDate("");
        setPharmacyId(pharmacies.length > 0 ? pharmacies[0]._id : "");
        setSelectedMedicineItems([]);
    };


    const findMedicineName = (id) => {
        const selectedMedicine = medicines.find((medicine) => medicine._id === id);
        return selectedMedicine ? selectedMedicine.name : "Unknown";
    };

    return (
        <div>
            <h2>Create Request</h2>
            <form onSubmit={handleCreateRequest}>
                <label>
                    Creation Date:
                    <input
                        type="date"
                        value={creationDate}
                        onChange={handleCreationDateChange}
                    />
                </label>
                <br/>
                <label>
                    Completion Date:
                    <input
                        type="date"
                        value={completionDate}
                        onChange={handleCompletionDateChange}
                    />
                </label>
                <br/>

                <div>
                    <label htmlFor="pharmacy">Pharmacy:</label>
                    <select value={pharmacyId} onChange={handlePharmacyChange}>
                        {pharmacies.map((pharmacy) => (
                            <option key={pharmacy._id} value={pharmacy._id}>
                                {pharmacy.name}
                            </option>
                        ))}
                    </select>
                </div>

                <br/>

                <div>
                    <div>
                        <label htmlFor="medicine">Select Medicine:</label>
                        <select
                            id="medicine"
                            value={medicineId}
                            onChange={handleMedicineChange}
                        >
                            {availableMedicines.map((medicine) => (
                                <option key={medicine._id} value={medicine._id}>
                                    {medicine.name} (Price: {medicine.price})
                                </option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <label htmlFor="quantity">Medicine Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={medicineQuantity}
                            onChange={handleMedicineQuantityChange}
                        />
                    </div>
                    <button type="button" onClick={handleAddMedicine}>
                        Add Medicine
                    </button>
                </div>

                <div>
                    <h3>Selected Medicines:</h3>
                    <ul>
                        {selectedMedicineItems.map((selectedMedicineItem, index) => (
                            <li key={index}>
                                {findMedicineName(selectedMedicineItem.medicineId)} (Quantity:{" "}
                                {selectedMedicineItem.medicineQuantity})
                            </li>
                        ))}
                    </ul>
                </div>

                <br/>
                <button type="submit">Create Request</button>
            </form>
        </div>
    );
};
