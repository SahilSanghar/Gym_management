import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Button, TextField, MenuItem } from '@mui/material';

const BasicDetailsForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePackageSelect = (value) => {
        setSelectedPackage(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const price = getPrice(selectedPackage); // Get price based on selected package

            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                name,
                age,
                fitnessGoals,
                selectedPackage,
                price, // Save price to Firestore
            }, { merge: true });

            console.log('User details saved');
            navigate('/admin/member'); // Redirect to bill display component
        } catch (err) {
            setError(err.message);
        }
    };

    const getPrice = (selectedPackage) => {
        switch (selectedPackage) {
            case 'Starter':
                return '$97';
            case 'Premium':
                return '$199';
            case 'Elite':
                return '$399';
            default:
                return '';
        }
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '470px',
                height: '520px', // Increased height to accommodate additional Typography
                cursor: 'pointer',
                gap: '20px',
                margin: '100px auto', // Center align horizontally
                padding: '20px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography fontSize="28px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
                Enter Your Basic Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <label htmlFor="name" style={{ fontSize: '20px', marginTop: '10px' }}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Stack>
                <Stack>
                    <label htmlFor="age" style={{ fontSize: '20px', marginTop: '10px' }}>Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Stack>
                <Stack>
                    <label htmlFor="fitnessGoals" style={{ fontSize: '20px', marginTop: '10px' }}>Fitness Goals:</label>
                    <textarea
                        id="fitnessGoals"
                        value={fitnessGoals}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setFitnessGoals(e.target.value)}
                        required
                    ></textarea>
                </Stack>
                <Stack>
                    <label htmlFor="selectedPackage" style={{ fontSize: '20px', marginTop: '10px' }}>Select Package:</label>
                    <TextField
                        id="selectedPackage"
                        select
                        value={selectedPackage}
                        onChange={(e) => handlePackageSelect(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '5px' }}
                        required
                    >
                        <MenuItem value="Starter">Starter</MenuItem>
                        <MenuItem value="Premium">Premium</MenuItem>
                        <MenuItem value="Elite">Elite</MenuItem>
                    </TextField>
                </Stack>
                {/* Display price based on selected package */}
                <Typography variant="body1" style={{ fontSize: '18px', marginTop: '10px' }}>
                    Price: {getPrice(selectedPackage)}
                </Typography>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '10px 40px', marginTop: '20px' }}>
                    Add Member
                </Button>
            </form>
        </Stack>
    );
};

export default BasicDetailsForm;
