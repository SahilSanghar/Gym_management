// src/components/AdminMember.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminMember = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            setError('');
            try {
                const q = query(collection(db, 'users'), where('userType', '==', 'member'));
                const querySnapshot = await getDocs(q);
                const membersList = [];
                querySnapshot.forEach((doc) => {
                    membersList.push({ id: doc.id, ...doc.data() });
                });
                setMembers(membersList);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMembers();
    }, []);

    const handlePaperClick = (userId) => {
        navigate(`/dashboard/${userId}`);
    };

    const handleEditClick = (userId) => {
        navigate(`/edit-member/${userId}`);
    };

    const handleDeleteClick = async (userId) => {
        try {
            await deleteDoc(doc(db, 'users', userId));
            setMembers(members.filter(member => member.id !== userId));
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
                width: '100%',
                height: '100vh',
                padding: '20px',
                gap: '20px',
            }}
        >
            <Typography fontSize="32px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
                Member Details
            </Typography>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {members.map((member) => (
                <Paper key={member.id} elevation={3} sx={{ padding: '20px', width: '80%', cursor: 'pointer' }}>
                    <div onClick={() => handlePaperClick(member.id)}>
                        <Typography fontSize="20px" fontWeight="bold">
                            Email: {member.email}
                        </Typography>
                        <Typography fontSize="18px">
                            User Type: {member.userType}
                        </Typography>
                        {/* Add other member details here */}
                    </div>
                    <div>
                        <IconButton onClick={() => handleEditClick(member.id)} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(member.id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    {/* Add other member details here */}
                </Paper>
            ))}
        </Stack>
    );
};

export default AdminMember;
