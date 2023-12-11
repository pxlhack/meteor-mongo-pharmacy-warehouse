import React from "react";
import {Link} from "react-router-dom";
import "../styles/header.css"

export const Header = ({user}) => {
    return (
        <div className="header-container">
            <header>
                <Link to="/pharmacies" className="header-link">Pharmacies</Link>
                <Link to="/requests" className="header-link">Requests</Link>
                <Link to="/manufacturers" className="header-link">Manufacturers</Link>
                <Link to="/medicines" className="header-link">Medicines</Link>
                <Link to="/countries" className="header-link">Countries</Link>
                {user ? <button onClick={Meteor.logout}>Logout</button> : null}
            </header>
        </div>
    );
}