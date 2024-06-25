import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Stack, Typography, Paper } from '@mui/material';

const MemberDashboard = () => {
    const { userId } = useParams();
    const [member, setMember] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMember = async () => {
            setError('');
            try {
                const docRef = doc(db, 'users', userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log(data)
                    setMember(data); // Set the entire data object from Firestore
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMember();
    }, [userId]);

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
                Member Dashboard
            </Typography>
            <Paper elevation={3} sx={{ padding: '20px', width: '80%' }}>
                <Typography fontSize="20px" fontWeight="bold">
                    Email: {member.email}
                </Typography>
                <Typography fontSize="18px">
                    User Type: {member.userType}
                </Typography>
                {/* Display other member details */}
                <Typography fontSize="18px">
                    Name: {member.name} {/* Ensure 'name' is correctly spelled */}
                </Typography>
                <Typography fontSize="18px">
                    Age: {member.age} {/* Ensure 'age' is correctly spelled */}
                </Typography>
                {/* Add other member details here */}
            </Paper>
        </Stack>
    );
};

export default MemberDashboard;
