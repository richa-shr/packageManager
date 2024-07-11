// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name= "email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
