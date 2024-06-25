// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Stack, Typography, Button } from '@mui/material';

const AdminDashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [branch, setBranch] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchAdminDetails = async () => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (!user) {
                    navigate('/'); // Redirect to login if not authenticated
                    return;
                }

                if (location.state) {
                    setAdminDetails(location.state);
                } else {
                    const adminDocRef = doc(db, 'users', user.uid, 'adminDetails', 'details');
                    const adminDoc = await getDoc(adminDocRef);

                    if (adminDoc.exists()) {
                        setAdminDetails(adminDoc.data());
                    } else {
                        setError('No admin details found.');
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminDetails();
    }, [navigate, location.state]);

    const handleEdit = () => {
        setEditMode(true);
        setAdminName(adminDetails.adminName);
        setBranch(adminDetails.branch);
        setJoiningDate(adminDetails.joiningDate);
    };

    const handleCont = () => {
        navigate('/admin/member')
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const adminDocRef = doc(db, 'users', user.uid, 'adminDetails', 'details');
            const updatedDetails = { adminName, branch, joiningDate };

            await setDoc(adminDocRef, updatedDetails);

            setAdminDetails(updatedDetails);
            setEditMode(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        // Reset fields to current details
        setAdminName(adminDetails.adminName);
        setBranch(adminDetails.branch);
        setJoiningDate(adminDetails.joiningDate);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!adminDetails) {
        return null;
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
                margin: '100px 500px'
            }}
        >
            <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">Admin Information</Typography>
            {!editMode ? (
                <>
                    <Typography><strong>Name:</strong> {adminDetails.adminName}</Typography>
                    <Typography><strong>Branch:</strong> {adminDetails.branch}</Typography>
                    <Typography><strong>Joining Date:</strong> {adminDetails.joiningDate}</Typography>
                    <Button onClick={handleEdit} variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px' }}>
                        Edit Details
                    </Button>
                    <Button onClick={handleCont} variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 62px', marginTop: '20px' }}>
                        Continue
                    </Button>
                </>
            ) : (
                <form onSubmit={handleSave}>
                    <Stack>
                        <label htmlFor="adminName" style={{ fontSize: '20px', marginTop: '10px' }}>Name of the Admin</label>
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
                        <label htmlFor="branch" style={{ fontSize: '20px', marginTop: '10px' }}>Branch</label>
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
                        <label htmlFor="joiningDate" style={{ fontSize: '20px', marginTop: '10px' }}>Joining Date</label>
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
                    <Button type="submit" variant="contained" color='error' sx={{ backgroundColor: '#ff2625', padding: '5px 10px', marginTop: '20px' }}>Save Changes</Button>
                    <Button type="button" onClick={handleCancel} variant="contained" sx={{ padding: '5px 10px', marginTop: '20px', marginLeft: '5px' }}>Cancel</Button>
                </form>
            )}
        </Stack>
    );
};

export default AdminDashboard;
