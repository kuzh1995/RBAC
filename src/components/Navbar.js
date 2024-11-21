import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/roles">Roles</NavLink></li>
            </ul>
        </div>
    );
};

export default Navbar;
