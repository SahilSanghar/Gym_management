import React, { useState } from 'react';
import { auth } from '../firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        await user.user.updateProfile({ displayName: role });
      // Save user role to Firestore or Realtime Database if needed
        console.log('User registered:', user);
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

return (
    <form onSubmit={handleRegister}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" required />
        <button type="submit">Register</button>
    </form>
);
};

export default Register;
