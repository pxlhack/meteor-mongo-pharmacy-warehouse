import React, {useState, useEffect} from 'react';

export const EditManufacturerForm = ({manufacturer, countries, onEdit, onCancel}) => {
    const [editedManufacturer, setEditedManufacturer] = useState({...manufacturer});

    useEffect(() => {
        setEditedManufacturer({...manufacturer});
    }, [manufacturer]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedManufacturer({...editedManufacturer, [name]: value});
    };

    const handleEdit = () => {
        onEdit(editedManufacturer);
    };

    return (
        <form className="form-container">
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedManufacturer.name}
                    onChange={handleInputChange}
                    className="input-field"
                />
            </div>
            <div>
                <label htmlFor="countryId">Country:</label>
                <select
                    id="countryId"
                    name="countryId"
                    value={editedManufacturer.countryId}
                    onChange={handleInputChange}
                    className="input-field"
                >
                    {countries && countries.length > 0 && (
                        countries.map((country) => (
                            <option key={country._id} value={country._id}>
                                {country.name}
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
}
