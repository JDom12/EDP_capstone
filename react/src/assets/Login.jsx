import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
//login form here

const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  navigate('/search');
};

return (
    <>
        <div>
        <form>
            <label for="id">Employee ID </label>
            <input type="text" id='id'/><br/>
            <label for="pass">Password </label>
            <input type="text" id='pass'/><br/>
            <input type="submit" value="Submit"/>
        </form>
        </div>
    </>
)
}

export default Login;