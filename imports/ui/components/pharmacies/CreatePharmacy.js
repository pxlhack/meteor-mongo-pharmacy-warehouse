import React, {useState} from 'react';

export const CreatePharmacy = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleCreatePharmacy = async () => {
        const newPharmacy = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
        };

        await Meteor.call('pharmacies.insert', newPharmacy);

        setName('');
        setAddress('');
        setPhoneNumber('');
    };

    return (
        <div className="container"> {/* Apply the 'container' class */}
            <h2>Create a New Pharmacy</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange}/>
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" value={address} onChange={handleAddressChange}/>
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone number:</label>
                <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange}/>
            </div>
            <button onClick={handleCreatePharmacy}>Create Pharmacy</button>
        </div>
    );
}

