import React, {useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {MedicinesCollection} from '../../../api/collections/MedicinesCollection';
import {ManufacturersCollection} from '../../../api/collections/ManufacturersCollection';
import {Dialog} from "../Dialog";
import {EditManufacturerForm} from "../manufacturers/EditManufacturerForm";
import {EditMedicineForm} from "./EditMedicineForm";

export const MedicineInfo = () => {
    const {id} = useParams();
    const {isLoading, medicine, manufacturer, manufacturers} = useTracker(() => {
        const medicineHandle = Meteor.subscribe('medicines');
        const manufacturerHandle = Meteor.subscribe('manufacturers');
        const isLoading = !medicineHandle.ready() || !manufacturerHandle.ready();

        const medicine = MedicinesCollection.findOne({_id: id});
        const manufacturer = medicine ? ManufacturersCollection.findOne({_id: medicine.manufacturerId}) : null;
        const manufacturers = ManufacturersCollection.find().fetch();

        return {isLoading, medicine, manufacturer, manufacturers};
    });

    const navigate = useNavigate();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

    function handleEditMedicine() {
        setIsEditDialogOpen(true);

    }

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleEdit = async (editedMedicine) => {
        try {
            await Meteor.call('medicines.update', id, editedMedicine);
            setIsEditDialogOpen(false);
        } catch (error) {
        }
    };

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
            <button onClick={handleEditMedicine}>Edit</button>

            {isEditDialogOpen && (
                <Dialog
                    title="Edit medicine"
                    onClose={handleCloseEditDialog}
                    content={<EditMedicineForm
                        medicine={medicine}
                        manufacturers={manufacturers}
                        onEdit={handleEdit}
                        onCancel={handleCloseEditDialog}
                    />}
                />
            )}
        </div>
    );
};
