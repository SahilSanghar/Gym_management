import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Stack, Typography } from '@mui/material';

const CreateBills = () => {
    const { userId } = useParams(); // Extract userId from route params
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setError('');
            try {
                const userDocRef = doc(db, 'users', userId); // Use userId to fetch specific user document
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, [userId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <Stack
            justifyContent="center"
            sx={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '470px',
                padding: '20px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                margin: '100px auto',
                gap: '20px',
                textAlign: 'left',
            }}
        >
            <Typography variant="h4" color="textPrimary" textAlign="start" gutterBottom>
                Bill
            </Typography>
            <Stack spacing={2} paddingLeft={5}>
                    <Typography variant="body1">Name <Typography variant='span' paddingLeft='235px'>{userData.name}</Typography></Typography>
                    <Typography variant="body1">Age <Typography variant='span' paddingLeft='250px'>{userData.age} yrs</Typography></Typography>
                    <Typography variant="body1">Fitness Goals <Typography variant='span' paddingLeft='180px'>{userData.fitnessGoals}</Typography></Typography>
                    <Typography variant="body1">Selected Package <Typography variant='span' paddingLeft='150px'>{userData.selectedPackage}</Typography></Typography>
                    <Typography variant="body1">Price <Typography variant='span' paddingLeft='240px'>{userData.price}</Typography></Typography>
                </Stack>
        </Stack>
    );
};

export default CreateBills;
