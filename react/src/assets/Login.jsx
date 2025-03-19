import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
//login form here
//const navigate = useNavigate();

const [id, setId] = useState('');
const [pass, setPass] = useState('');

const handleIdChange = (e) => {
    setId(e.target.value);
    console.log(id);
};

const handlePassChange = (e) => {
    setPass(e.target.value);
    console.log(pass);
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(id, pass);

  //navigate('/search');
};

return (
    <>
        <div>
        <form>
            <label for="id">Employee ID </label>
            <input type="text" id='id' value={id} onChange={handleIdChange}/><br/>
            <label for="pass">Password </label>
            <input type="text" id='pass' value={pass} onChange={handlePassChange}/><br/>
            <input type="submit" value="Submit" onSubmit={handleSubmit}/>
        </form>
        </div>
    </>
)
}

export default Login;