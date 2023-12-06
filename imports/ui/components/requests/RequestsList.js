// RequestsList.js

import React from 'react';
import {useTracker} from "meteor/react-meteor-data";
import {RequestsCollection} from "../../../api/collections/RequestsCollection";

export const RequestsList = () => {
    const {isLoading, requests} = useTracker(() => {
        const handle = Meteor.subscribe('requests');
        const isLoading = !handle.ready();
        const requests = RequestsCollection.find().fetch();
        return {isLoading, requests};
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>List of requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        <a href={`/requests/${request._id}`} style={{textDecoration: 0}}>
                            <h3>{request.creationDate}</h3>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}