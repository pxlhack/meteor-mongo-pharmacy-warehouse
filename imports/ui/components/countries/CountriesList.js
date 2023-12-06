import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CountriesCollection } from '../../../api/collections/CountriesCollection';

export const CountriesList = () => {
    const { isLoading, countries } = useTracker(() => {
        const handle = Meteor.subscribe('countries'); // Make sure you have a publication named 'countries'
        const isLoading = !handle.ready();
        const countries = CountriesCollection.find().fetch();
        return { isLoading, countries };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {countries.map((country) => (
                <div key={country._id}>
                    <label>{country.name}</label>
                </div>
            ))}
        </div>
    );
};
