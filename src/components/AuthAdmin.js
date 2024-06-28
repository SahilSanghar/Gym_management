import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Stack, Typography, Button } from '@mui/material'

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [userType, setUserType] = useState('member');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isRegister) {
        // Registration logic
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

          // Store user data in Firestore
            await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            uid: user.uid,
            userType: userType
        });

            console.log('User registered:', user);// Redirect to admin dashboard if userType is admin
            if (userType === 'admin') {
                navigate('/Admin-details');
            }
        } catch (err) {
            setError(err.message);
        }
    } else {
        // Login logic
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in');
            // Redirect to admin dashboard
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }
    };

    const toggleMode = () => {
        setIsRegister((prev) => !prev);
        setError('');
    };

return (
    <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    sx={
        {
            // border:'4px solid #ff2625', 
            backgroundColor: '#fff',
            borderBottomLeftRadius: '20px',
            width: '470px',
            height: '480px',
            cursor: 'pointer', 
            gap: '47px',
            margin: '100px 500px'
        }
    }>
        <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
            {isRegister ? 'Register' : 'Login'} (Admin Only)
        </Typography>
        <form onSubmit={handleSubmit}>
        <Stack>
            <label htmlFor="email" style={{fontSize: '20px'}}>Email</label>
            <input
            type="email"
            id="email"
            value={email}
            style={{marginTop: '5px'}}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </Stack>
        <Stack>
            <label htmlFor="password" style={{fontSize: '20px', marginTop: '10px'}}>Password</label>
            <input
            type="password"
            id="password"
            value={password}
            style={{marginTop: '5px'}}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </Stack>
        {isRegister && (
            <Stack>
            <label htmlFor="userType" style={{fontSize: '20px', marginTop: '10px'}}>User Type:</label>
            <select
                id="userType"
                value={userType}
                style={{marginTop: '5px'}}
                onChange={(e) => setUserType(e.target.value)}
            >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>
            </Stack>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px'}}>
            {isRegister ? 'Register' : 'Login'}
        </Button>
        </form>
        <Button onClick={toggleMode} variant="text" style={{fontSize: "10px", margin: "-45px 0 10px 0", backgroundColor: 'white' }}>
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
    </Stack>
)
}

export default Admin