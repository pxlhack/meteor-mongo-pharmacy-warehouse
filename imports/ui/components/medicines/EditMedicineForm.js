// EditMedicineForm.js

import React, { useState, useEffect } from 'react';

export const EditMedicineForm = ({ medicine, manufacturers, onEdit, onCancel }) => {
    const [editedMedicine, setEditedMedicine] = useState({ ...medicine });

    useEffect(() => {
        setEditedMedicine({ ...medicine });
    }, [medicine]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMedicine({ ...editedMedicine, [name]: value });
    };

    const handleEdit = () => {
        onEdit(editedMedicine);
    };

    return (
        <form className="form-container">
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedMedicine.name}
                    onChange={handleInputChange}
                    className="input-field"
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={editedMedicine.price}
                    onChange={handleInputChange}
                    className="input-field"
                />
            </div>
            <div>
                <label htmlFor="manufacturerId">Manufacturer:</label>
                <select
                    id="manufacturerId"
                    name="manufacturerId"
                    value={editedMedicine.manufacturerId}
                    onChange={handleInputChange}
                    className="input-field"
                >
                    {manufacturers && manufacturers.length > 0 && (
                        manufacturers.map((manufacturer) => (
                            <option key={manufacturer._id} value={manufacturer._id}>
                                {manufacturer.name}
                            </option>
                        ))
                    )}
                </select>
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

