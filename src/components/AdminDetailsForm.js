// src/components/AdminDetailsForm.js
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

const AdminDetailsForm = () => {
    const [adminName, setAdminName] = useState('');
    const [branch, setBranch] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
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

            const userDocRef = doc(db, 'users', user.uid, 'adminDetails', 'details');
            await setDoc(userDocRef, {
                adminName,
                branch,
                joiningDate,
            });

            console.log('Admin details saved');
            navigate('/admin-dashboard'); // Redirect to dashboard after saving details
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
                borderBottomLeftRadius: '20px',
                width: '470px',
                height: '480px',
                cursor: 'pointer',
                gap: '47px',
                margin: '100px 500px'
            }}
        >
            <Typography fontSize="28px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
                Enter Admin Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <label htmlFor="adminName" style={{ fontSize: '20px', marginTop: '10px' }}>Name of the Admin:</label>
                    <input
                        type="text"
                        id="adminName"
                        value={adminName}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                    />
                </Stack>
                <Stack>
                    <label htmlFor="branch" style={{ fontSize: '20px', marginTop: '10px' }}>Branch:</label>
                    <input
                        type="text"
                        id="branch"
                        value={branch}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                    />
                </Stack>
                <Stack>
                    <label htmlFor="joiningDate" style={{ fontSize: '20px', marginTop: '10px' }}>Joining Date:</label>
                    <input
                        type="date"
                        id="joiningDate"
                        value={joiningDate}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        required
                    />
                </Stack>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px' }}>
                    Save Details
                </Button>
            </form>
        </Stack>
    );
};

export default AdminDetailsForm;
