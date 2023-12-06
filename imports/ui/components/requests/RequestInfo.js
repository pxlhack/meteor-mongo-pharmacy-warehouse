import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {useParams} from 'react-router-dom';
import {RequestsCollection} from '../../../api/collections/RequestsCollection';

export const RequestInfo = () => {
    const {id} = useParams();
    const {isLoading, request} = useTracker(() => {
        const requestHandle = Meteor.subscribe('requests');
        const isLoading = !requestHandle.ready();
        const request = RequestsCollection.findOne({_id: id});
        return {isLoading, request};
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!request) {
        return <div>Medicine not found</div>;
    }

    return (
        <div>
            <h2>{request.pharmacyId}</h2>
        </div>
    );
};
