import react from 'react';
import { useAuth } from "../hooks/AuthContent";
import "./navBar.css"
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";


function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (user) {
            navigate(path);
        } else {
            alert("You must be logged in to access this page.");
        }
    };

    return (
        <nav className="navBar">
            <ul className="navLinks">
                <li>
                    <button onClick={() => handleNavigation("/search")}>SEARCH</button>
                </li>
                <li>
                    <button onClick={() => handleNavigation("/predict-salary")}>PREDICT SALARY</button>
                </li>
                {user && (
                    <li>
                        <button onClick={logout} id="logout">LOGOUT</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
export default NavBar;