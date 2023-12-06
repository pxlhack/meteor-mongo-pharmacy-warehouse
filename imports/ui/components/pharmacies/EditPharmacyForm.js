import React, {useEffect, useState} from "react";

export const EditPharmacyForm = ({pharmacy, onEdit, onCancel}) => {
    const [editedPharmacy, setEditedPharmacy] = useState({...pharmacy});

    useEffect(() => {
        setEditedPharmacy({...pharmacy});
    }, [pharmacy]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedPharmacy({...editedPharmacy, [name]: value});
    };

    const handleEdit = () => {
        onEdit(editedPharmacy);
    };

    return (
        <form className="form-container">
            <div>
                <label htmlFor="name">Pharmacy Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedPharmacy.name}
                    onChange={handleInputChange}
                    className="input-field"
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">Pharmacy Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editedPharmacy.phoneNumber}
                    onChange={handleInputChange}
                    className="input-field"
                />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={editedPharmacy.address}
                    onChange={handleInputChange}
                    className="input-field"
                />
            </div>
            <button type="button" onClick={handleEdit} className="button">
                Save Changes
            </button>
            <button type="button" onClick={onCancel} className="button">
                Cancel
            </button>
        </form>
    );
};
