import React, {useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {useNavigate, useParams} from 'react-router-dom';
import {ManufacturersCollection} from '../../../api/collections/ManufacturersCollection';
import {CountriesCollection} from '../../../api/collections/CountriesCollection';
import {Dialog} from "../Dialog";
import {EditManufacturerForm} from "./EditManufacturerForm";

export const ManufacturerInfo = () => {
    const {id} = useParams();
    const {isLoading, manufacturer, country, countries} = useTracker(() => {
        const manufacturersHandle = Meteor.subscribe('manufacturers');
        const countriesHandle = Meteor.subscribe('countries');
        const isLoading = !(manufacturersHandle.ready() && countriesHandle.ready());

        const manufacturer = ManufacturersCollection.findOne({_id: id});
        const country = CountriesCollection.findOne({_id: manufacturer?.countryId});
        const countries = CountriesCollection.find({}, { sort: { name: 1 } }).fetch();

        return {isLoading, manufacturer, country, countries};
    });
    const navigate = useNavigate();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEditManufacturer = (editedManufacturer) => {
        console.log('Edited Manufacturer:', editedManufacturer);
        setIsEditDialogOpen(true);
    };


    const handleDeleteManufacturer = async () => {
        try {
            await Meteor.call('manufacturers.delete', id);

            navigate('/manufacturers');

        } catch (error) {
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!manufacturer) {
        return <div>Manufacturer not found</div>;
    }

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };


    const handleEdit = async (editedManufacturer) => {
        try {
            await Meteor.call('manufacturers.update', id, editedManufacturer);
            setIsEditDialogOpen(false);
        } catch (error) {
        }
    };


    return (
        <div>
            <h2>Info for {manufacturer.name}</h2>
            {country ? (
                <p>Country: {country.name}</p>
            ) : (
                <p>Loading country data...</p>
            )}
            <button onClick={handleEditManufacturer}>Edit</button>
            <button onClick={handleDeleteManufacturer}>Delete</button>

            {isEditDialogOpen && (
                <Dialog
                    title="Edit Manufacturer"
                    onClose={handleCloseEditDialog}
                    content={<EditManufacturerForm
                        manufacturer={manufacturer}
                        countries={countries}
                        onEdit={handleEdit}
                        onCancel={handleCloseEditDialog}
                    />}
                />
            )}
        </div>
    );
};
