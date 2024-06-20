import React, { useState } from 'react';
import { login } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const handleLogin = async (e) => {
    try {
        const response = await login({ email, password });
        console.log('Login successful:', response.data);
      // Redirect to members page or dashboard
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

return (
    <div>
        <h2>Login</h2>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
    </div>
);
};

export default Login;
