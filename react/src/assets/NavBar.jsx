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
                    <button onClick={() => handleNavigation("/search")}>Search</button>
                </li>
                <li>
                    <button onClick={() => handleNavigation("/predict-salary")}>Predict Salary</button>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
export default NavBar;