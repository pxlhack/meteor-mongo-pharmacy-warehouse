import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {CountriesCollection} from "../../../api/collections/CountriesCollection";

export const CreateManufacturer = () => {
    const {countries} = useTracker(() => {
        const handle = Meteor.subscribe('countries');
        const isLoading = !handle.ready();
        const countries = CountriesCollection.find().fetch();
        return {countries, isLoading};
    });

    const [name, setName] = useState('');
    const defaultCountryId = countries.length > 0 ? countries[0]._id : '';
    const [countryId, setCountryId] = useState(defaultCountryId);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountryId(event.target.value);
    };


    const handleCreateManufacturer = (event) => {
        event.preventDefault();
        Meteor.call('manufacturers.insert', {name, countryId}, (error) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log('Manufacturer inserted successfully');
            }
        });

        setName('');
        setCountryId('');
    };

    return (<div>
        <h2>Create Manufacturer</h2>
        <form onSubmit={handleCreateManufacturer}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange}/>
            </label>
            <br/>
            <div>
                <label htmlFor="country">Country:</label>
                <select value={countryId} onChange={handleCountryChange}>
                    {countries.map(country => (<option key={country._id} value={country._id}>
                        {country.name}
                    </option>))}
                </select>
            </div>

            <br/>
            <button type="submit">Create Manufacturer</button>
        </form>
    </div>);
};
