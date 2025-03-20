import react from 'react';
import { useAuth } from "../hooks/AuthContent";
import "./navBar.css"
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";


function NavBar() {

    const { user, logout } = useAuth();
    console.log(user)

    if (!user) return null;

    return (
        <nav className="navBar">
            <ul className="navLinks">
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/predict-salary">Predict Salary</Link></li>
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    );
}

export default NavBar;