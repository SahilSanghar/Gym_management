import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Typography, Button, TextField, Paper, Stack } from '@mui/material';

const RegisterMember = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore with userType set to 'member'
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                uid: user.uid,
                userType: 'member', // Hardcoded as 'member'
            });

            console.log('User registered:', user);
            navigate('/basic-details');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                width: '470px',
                padding: '20px',
                margin: '50px 530px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Paper elevation={3} sx={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
                <Typography variant="h5" color="error" gutterBottom>
                    Add Member
                </Typography>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    type="submit"
                    variant="contained"
                    color='error'
                    fullWidth
                    onClick={handleRegister}
                    sx={{ marginTop: '20px', backgroundColor: '#ff2625', color: 'white' }}
                >
                    Proceed
                </Button>
            </Paper>
        </Stack>
    );
};

export default RegisterMember;
