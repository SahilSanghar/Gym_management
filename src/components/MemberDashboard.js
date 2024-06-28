import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Stack, Typography, Paper, Button } from '@mui/material';

const MemberDashboard = () => {
    const { userId } = useParams(); // Extract userId from route params
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMember = async () => {
            setError('');
            try {
                const docRef = doc(db, 'users', userId); // Use userId to fetch specific user document
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setMember(data);
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMember();
    }, [userId]);

    const handleViewBillClick = () => {
        navigate(`/dashboard/${userId}/bill`); // Navigate to the bill route with userId
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!member) {
        return <p>Loading...</p>;
    }

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '100%',
                height: '100vh',
                padding: '20px',
                gap: '20px',
            }}
        >
            <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
                Member Details
            </Typography>
            <Paper elevation={3} sx={{ padding: '20px', width: '30%' }}>
                <Typography fontSize="20px" fontWeight="bold">
                    Email: {member.email}
                </Typography>
                <Typography fontSize="18px">
                    Name: {member.name}
                </Typography>
                <Typography fontSize="18px">
                    Age: {member.age}
                </Typography>
                <Typography fontSize="18px">
                    Fitness Goals: {member.fitnessGoals}
                </Typography>
                {/* Add other member details here */}

                {/* Button for View Bill */}
                <Button
                    variant="contained"
                    color="error"
                    style={{ marginTop: '20px' }}
                    onClick={handleViewBillClick} // Attach onClick handler
                >
                    View Bill
                </Button>
            </Paper>
        </Stack>
    );
};

export default MemberDashboard;
