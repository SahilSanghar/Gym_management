// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Stack, Typography, Button } from '@mui/material'

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
    const fetchUserDetails = async () => {
        setLoading(true);
        try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/'); // Redirect to login if not authenticated
            return;
        }

        if (location.state) {
            setUserDetails(location.state);
        } else {
            const userDocRef = doc(db, 'users', user.uid, 'fitnessDetails', 'details');
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
            setUserDetails(userDoc.data());
            } else {
            setError('No fitness details found.');
            }
        }
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    const handleSave = async () => {
        setError('');
    
        try {
            const user = auth.currentUser;
            if (!user) {
            throw new Error('User not authenticated');
            }
    
            const userDocRef = doc(db, 'users', user.uid, 'fitnessDetails', 'details');
            const updatedDetails = { name, age, fitnessGoals };
    
            await setDoc(userDocRef, updatedDetails);
    
            setUserDetails(updatedDetails);
            setEditMode(false);
        } catch (err) {
            setError(err.message);
        }
        };
    
    const handleCancel = () => {
        setEditMode(false);
        // Reset fields to current details
        setName(userDetails.name);
        setAge(userDetails.age);
        setFitnessGoals(userDetails.fitnessGoals);
    };

    fetchUserDetails();
    }, [navigate, location.state]);

    const handleEdit = () => {
        setEditMode(true);
        setName(userDetails.name);
        setAge(userDetails.age);
        setFitnessGoals(userDetails.fitnessGoals);
        };
    
        const handleSave = async () => {
        setError('');
    
        try {
            const user = auth.currentUser;
            if (!user) {
            throw new Error('User not authenticated');
            }
    
            const userDocRef = doc(db, 'users', user.uid, 'fitnessDetails', 'details');
            const updatedDetails = { name, age, fitnessGoals };
    
            await setDoc(userDocRef, updatedDetails);
    
            setUserDetails(updatedDetails);
            setEditMode(false);
        } catch (err) {
            setError(err.message);
        }
    };
    
    const handleCancel = () => {
        setEditMode(false);
        // Reset fields to current details
        setName(userDetails.name);
        setAge(userDetails.age);
        setFitnessGoals(userDetails.fitnessGoals);
        };

    

    if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userDetails) {
    return null;
    }

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
        <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">Information</Typography>
    {!editMode ? (
        <>
        <Typography><strong>Name:</strong> {userDetails.name}</Typography>
        <Typography><strong>Age:</strong> {userDetails.age}</Typography>
        <Typography><strong>Fitness Goals:</strong> {userDetails.fitnessGoals}</Typography>
        <Button onClick={handleEdit} variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px'}}>
            Edit Details
        </Button>
      {/* Add more fitness details as needed */}
        </>
        ) : (
            <form onSubmit={handleSave}>
        <Stack>
            <label htmlFor="name" style={{fontSize: '20px', marginTop: '10px'}}>Name</label>
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
            <label htmlFor="age" style={{fontSize: '20px', marginTop: '10px'}}>Age</label>
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
            <label htmlFor="fitnessGoals" style={{fontSize: '20px', marginTop: '10px'}}>Fitness Goals</label>
            <textarea
                id="fitnessGoals"
                value={fitnessGoals}
                style={{marginTop: '5px'}}
                onChange={(e) => setFitnessGoals(e.target.value)}
                required
            ></textarea>
        </Stack>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 10px', marginTop: '20px' }}>Save Changes</Button>
            <Button type="button" onClick={handleCancel} variant="contained" sx={{ padding: '5px 10px', marginTop: '20px', marginLeft: '5px' }}>Cancel</Button>
        </form>
        )}
    </Stack>
    );
};

export default Dashboard;
