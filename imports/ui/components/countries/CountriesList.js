import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {CountriesCollection} from '../../../api/collections/CountriesCollection';

export const CountriesList = () => {
    const {isLoading, countries} = useTracker(() => {
        const handle = Meteor.subscribe('countries'); // Make sure you have a publication named 'countries'
        const isLoading = !handle.ready();
        const countries = CountriesCollection.find().fetch();
        return {isLoading, countries};
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of Countries</h2>
            <ul>
                {countries.map(country => (
                    <li key={country._id}>
                        <a href={`/countries/${country._id}`} style={{textDecoration: 0}}>
                            <h3>{country.name}</h3>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
