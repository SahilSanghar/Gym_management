import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Stack, Typography, Button } from '@mui/material';
import RegisterMember from './RegisterMember';

const AuthMember = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleMode = () => {
        setIsRegister((prev) => !prev);
        setError('');
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '470px',
                height: '480px',
                cursor: 'pointer',
                gap: '47px',
                margin: '100px 500px'
            }}
        >
            <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
                {isRegister ? 'Register' : 'Login'}
            </Typography>
            {isRegister ? (
                <RegisterMember />
            ) : (
                <form onSubmit={handleLogin}>
                    <Stack>
                        <label htmlFor="email" style={{ fontSize: '20px' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            style={{ marginTop: '5px' }}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Stack>
                    <Stack>
                        <label htmlFor="password" style={{ fontSize: '20px', marginTop: '10px' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            style={{ marginTop: '5px' }}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Stack>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px' }}>
                        Login
                    </Button>
                </form>
            )}
            <Button type="button" variant="text" style={{ fontSize: "10px", margin: "-45px 0 10px 0", backgroundColor: 'white' }} onClick={toggleMode}>
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
        </Stack>
    );
};

export default AuthMember;
