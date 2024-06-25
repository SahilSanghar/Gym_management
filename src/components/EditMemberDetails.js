// src/components/EditMemberDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Stack, Typography, Button } from '@mui/material';

const EditMemberDetails = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fitnessGoals, setFitnessGoals] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const userDocRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserDetails(data);
                    setName(data.name || '');
                    setAge(data.age || '');
                    setFitnessGoals(data.fitnessGoals || '');
                } else {
                    setError('No fitness details found.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userDocRef = doc(db, 'users', userId);
            const updatedDetails = { name, age, fitnessGoals };

            await setDoc(userDocRef, updatedDetails, { merge: true });

            navigate('/admin/member');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        navigate('/admin/member');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userDetails) {
        return <p>No fitness details found.</p>;
    }

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
                margin: '100px auto',
            }}
        >
            <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
                Edit Member Details
            </Typography>
            <form onSubmit={handleSave}>
                <Stack>
                    <label htmlFor="name" style={{ fontSize: '20px', marginTop: '10px' }}>Name</label>
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
                    <label htmlFor="age" style={{ fontSize: '20px', marginTop: '10px' }}>Age</label>
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
                    <label htmlFor="fitnessGoals" style={{ fontSize: '20px', marginTop: '10px' }}>Fitness Goals</label>
                    <textarea
                        id="fitnessGoals"
                        value={fitnessGoals}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setFitnessGoals(e.target.value)}
                        required
                    ></textarea>
                </Stack>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color="error" sx={{ backgroundColor: '#ff2625', padding: '5px 10px', marginTop: '20px' }}>Save Changes</Button>
                <Button type="button" onClick={handleCancel} variant="contained" sx={{ padding: '5px 10px', marginTop: '20px', marginLeft: '5px' }}>Cancel</Button>
            </form>
        </Stack>
    );
};

export default EditMemberDetails;
