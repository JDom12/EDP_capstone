import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContent";

function Login() {
    //login form here
    //const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState();
    const [errMsg, setErrMsg] = useState();
    const { login } = useAuth();
    const navigate = useNavigate();

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

        //const url = `http://localhost:3000/api/login/`
        
        try {
            //const res = await fetch(url); 
            //const userData = await res.json(); 
            //setUser(userData);
            await login(id, pass)
            navigate("/search")
            
            /*
            if (userData.length == 0) {
                setErrMsg("Invalid login, please try again");
            }
            else {
                setErrMsg("Success");
                //navigate('/search');
            }*/
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <>
            <div>
                <form>
                    <label for="id">Employee ID </label>
                    <input type="text" id='id' value={id} onChange={(e) => handleIdChange(e)} /><br />
                    <label for="pass">Password </label>
                    <input type="text" id='pass' value={pass} onChange={(e) => handlePassChange(e)} /><br />
                    <button type="button" onClick={handleSubmit}>Log In</button>
                </form>
                <p>{errMsg}</p>
            </div>
        </>
    )
}

export default Login;