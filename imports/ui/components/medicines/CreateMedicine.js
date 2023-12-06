import {useTracker} from "meteor/react-meteor-data";
import {ManufacturersCollection} from "../../../api/collections/ManufacturersCollection";
import React, {useState} from "react";

export const CreateMedicine = () => {
    const {manufacturers} = useTracker(() => {
        const handle = Meteor.subscribe('manufacturers');
        const isLoading = !handle.ready();
        const manufacturers = ManufacturersCollection.find().fetch();
        return {manufacturers, isLoading};
    });

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const defaultManufacturerId = manufacturers.length > 0 ? manufacturers[0]._id : '';
    const [manufacturerId, setManufacturerId] = useState(defaultManufacturerId);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleManufacturerChange = (event) => {
        setManufacturerId(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };


    const handleCreateMedicine = async () => {
        const newMedicine = {
            name: name,
            price: +price,
            manufacturerId: manufacturerId,
        };

        await Meteor.call('medicines.insert', newMedicine);

        setName('');
        setPrice(0);
        setManufacturerId('');
    };

    return (<div>
        <h2>Create medicine</h2>
        <form onSubmit={handleCreateMedicine}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange}/>
            </label>
            <br/>
            <label>
                Price:
                <input type="number" value={price} onChange={handlePriceChange}/>
            </label>
            <br/>

            <div>
                <label htmlFor="manufacturer">Manufacturer:</label>
                <select value={manufacturerId} onChange={handleManufacturerChange}>
                    {manufacturers.map(manufacturer => (<option key={manufacturer._id} value={manufacturer._id}>
                        {manufacturer.name}
                    </option>))}
                </select>
            </div>

            <br/>
            <button type="submit">Create medicine</button>
        </form>
    </div>);
}