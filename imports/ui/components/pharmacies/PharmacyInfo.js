import React, {useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {useNavigate, useParams} from 'react-router-dom';
import {PharmaciesCollection} from '../../../api/collections/PharmaciesCollection';
import {Dialog} from "../Dialog";
import {EditPharmacyForm} from "./EditPharmacyForm";


export const PharmacyInfo = () => {
    const {id} = useParams();
    const {isLoading, pharmacy} = useTracker(() => {
        const handle = Meteor.subscribe('pharmacies');
        const isLoading = !handle.ready();
        const pharmacy = PharmaciesCollection.findOne({_id: id});
        return {isLoading, pharmacy};
    });

    const navigate = useNavigate();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!pharmacy) {
        return <div>Pharmacy not found</div>;
    }

    function handleEditPharmacy() {
        setIsEditDialogOpen(true);

    }

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleEdit = async (editedPharmacy) => {
        try {
            await Meteor.call('pharmacies.update', id, editedPharmacy);
            setIsEditDialogOpen(false);
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>{pharmacy.name}</h2>
            <p>Pharmacy Number: {pharmacy.phoneNumber}</p>
            <p>Address: {pharmacy.address}</p>

            <button onClick={handleEditPharmacy}>Edit</button>

            {isEditDialogOpen && (
                <Dialog
                    title="Edit pharmacy"
                    onClose={handleCloseEditDialog}
                    content={<EditPharmacyForm
                        pharmacy={pharmacy}
                        onEdit={handleEdit}
                        onCancel={handleCloseEditDialog}
                    />}
                />
            )}
        </div>
    );
};
