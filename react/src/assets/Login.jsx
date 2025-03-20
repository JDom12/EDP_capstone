import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContent";
import './Login.css';

function Login() {
    
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState();
    const [errMsg, setErrMsg] = useState();
    const { login } = useAuth();

    useEffect(() => {
        console.log("User Data:", user);
    }, [user]);

    const handleIdChange = (e) => {
        setId(e.target.value);
        console.log(id);
    };

    const handlePassChange = (e) => {
        setPass(e.target.value);
        console.log(pass);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id, pass);
        
        try {
            await login(id, pass)
            navigate("/search")

        } catch (err) {
            console.error(err);
        }

    };

    return (
        <>
            <div>
                <form>
                    <label htmlFor="id">Employee ID </label>
                    <input type="text" id='id' value={id} onChange={handleIdChange} /><br />
                    <label htmlFor="pass">Password </label>
                    <input type="text" id='pass' value={pass} onChange={handlePassChange} /><br />
                    <button type="button" onClick={handleSubmit}>Log In</button>
                </form>
                <p>{errMsg}</p>
            </div>
        </>
    )
}

export default Login;