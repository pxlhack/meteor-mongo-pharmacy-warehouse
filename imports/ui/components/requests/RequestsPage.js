import React from "react";
import {RequestsList} from "./RequestsList";
import {CreateRequest} from "./CreateRequest";

export const RequestsPage = () => {
    return (
        <div>
            <CreateRequest/>
            <RequestsList/>
        </div>
    );
}

