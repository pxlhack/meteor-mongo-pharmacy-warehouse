import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {useNavigate, useParams} from 'react-router-dom';
import {ManufacturersCollection} from '../../../api/collections/ManufacturersCollection';
import {CountriesCollection} from '../../../api/collections/CountriesCollection';

export const ManufacturerInfo = () => {
    const {id} = useParams();
    const {isLoading, manufacturer, country} = useTracker(() => {
        const manufacturersHandle = Meteor.subscribe('manufacturers');
        const countriesHandle = Meteor.subscribe('countries');
        const isLoading = !(manufacturersHandle.ready() && countriesHandle.ready());

        const manufacturer = ManufacturersCollection.findOne({_id: id});
        const country = CountriesCollection.findOne({_id: manufacturer?.countryId});

        return {isLoading, manufacturer, country};
    });
    const navigate = useNavigate();

    const handleDeleteManufacturer = async () => {
        try {
            await Meteor.call('manufacturers.delete', id);

            navigate('/manufacturers');

        }
        catch (error) {
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!manufacturer) {
        return <div>Manufacturer not found</div>;
    }

    return (
        <div>
            <h2>Info for {manufacturer.name}</h2>
            {country ? (
                <p>Country: {country.name}</p>
            ) : (
                <p>Loading country data...</p>
            )}
            <button onClick={handleDeleteManufacturer}>Delete</button>
        </div>
    );
};
