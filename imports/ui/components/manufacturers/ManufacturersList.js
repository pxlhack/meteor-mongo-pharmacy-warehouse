import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ManufacturersCollection } from '../../../api/collections/ManufacturersCollection';

export const ManufacturersList = () => {
    const { isLoading, manufacturers } = useTracker(() => {
        const handle = Meteor.subscribe('manufacturers');
        const isLoading = !handle.ready();
        const manufacturers = ManufacturersCollection.find().fetch();
        return { isLoading, manufacturers };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of Manufacturers</h2>
            <ul>
                {manufacturers.map(manufacturer => (
                    <li key={manufacturer._id}>
                        <a href={`/manufacturers/${manufacturer._id}`} style={{ textDecoration: 'none' }}>
                            <h3>{manufacturer.name}</h3>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
