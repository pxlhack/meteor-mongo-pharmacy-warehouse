import React from "react";
import {Link} from "react-router-dom";
import "../styles/header.css"

export const Header = () => {
    return (
        <div className="header-container">
            <header>
                <Link to="/pharmacies" className="header-link">Pharmacies</Link>
                <Link to="/requests" className="header-link">Requests</Link>
                <Link to="/manufacturers" className="header-link">Manufacturers</Link>
            </header>
        </div>
    );
}

