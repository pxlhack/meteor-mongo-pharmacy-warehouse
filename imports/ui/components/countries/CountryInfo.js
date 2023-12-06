import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { CountriesCollection } from '../../../api/collections/CountriesCollection';

export const CountryInfo = () => {
    const { id } = useParams();
    const { isLoading, country } = useTracker(() => {
        const handle = Meteor.subscribe('countries');
        const isLoading = !handle.ready();
        const country = CountriesCollection.findOne({ _id: id });
        return { isLoading, country };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!country) {
        return <div>Country not found</div>;
    }

    return (
        <div>
            <h2>{country.name}</h2>
        </div>
    );
};
