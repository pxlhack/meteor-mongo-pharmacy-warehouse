import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {ManufacturersCollection} from '../../../api/collections/ManufacturersCollection';
import {CountriesCollection} from "../../../api/collections/CountriesCollection";

export const ManufacturersList = () => {
    const {isLoading, manufacturersWithCountry} = useTracker(() => {
        const handle = Meteor.subscribe('manufacturers');
        const isLoading = !handle.ready();
        const manufacturers = ManufacturersCollection.find().fetch();

        const countries = CountriesCollection.find().fetch();
        const manufacturersWithCountry = manufacturers.map(manufacturer => {
            const country = countries.find(c => c._id === manufacturer.countryId);
            return {
                ...manufacturer,
                countryName: country ? country.name : 'Unknown'
            };
        });

        return {isLoading, manufacturersWithCountry};
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of Manufacturers</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Manufacturer Name</th>
                    <th>Country</th>
                </tr>
                </thead>
                <tbody>
                {manufacturersWithCountry.map((manufacturer, index) => (
                    <tr key={manufacturer._id}>
                        <td>{index + 1}</td>
                        <td>
                            <a href={`/manufacturers/${manufacturer._id}`} style={{textDecoration: 'none'}}>
                                <h3>{manufacturer.name}</h3>
                            </a>
                        </td>
                        <td>
                            <a href={`/countries/${manufacturer.countryId}`} style={{textDecoration: 'none'}}>
                                {manufacturer.countryName}
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
