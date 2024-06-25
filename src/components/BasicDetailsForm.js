// src/components/BasicDetailsForm.js
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material'

const BasicDetailsForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated');
        }

        const userDocRef = doc(db, 'users', user.uid, 'fitnessDetails', 'details');
        await setDoc(userDocRef, {
        name,
        age,
        fitnessGoals,
        });

        console.log('User details saved');
        navigate('/dashboard'); // Redirect to dashboard after saving details
    } catch (err) {
        setError(err.message);
    }
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
        <Typography fontSize="28px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
            Enter Your Basic Details
        </Typography>
        <form onSubmit={handleSubmit}>
        <Stack>
            <label htmlFor="name" style={{fontSize: '20px', marginTop: '10px'}}>Name:</label>
            <input
            type="text"
            id="name"
            value={name}
            style={{marginTop: '5px'}}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </Stack>
        <Stack>
            <label htmlFor="age" style={{fontSize: '20px', marginTop: '10px'}}>Age:</label>
            <input
            type="number"
            id="age"
            value={age}
            style={{marginTop: '5px'}}
            onChange={(e) => setAge(e.target.value)}
            required
            />
        </Stack>
        <Stack>
            <label htmlFor="fitnessGoals" style={{fontSize: '20px', marginTop: '10px'}}>Fitness Goals:</label>
            <textarea
            id="fitnessGoals"
            value={fitnessGoals}
            style={{marginTop: '5px'}}
            onChange={(e) => setFitnessGoals(e.target.value)}
            required
            ></textarea>
        </Stack>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px'}}>
            Save Details
        </Button>
    </form>
    </Stack>
);
};

export default BasicDetailsForm;
