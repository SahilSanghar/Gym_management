import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AdminMember = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const [showUpdateDelete, setShowUpdateDelete] = useState(false); // State to manage showing individual update/delete buttons
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
            navigate('/admin/member');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddMemberClick = () => {
        navigate('/admin/member/add_member');
    };

    const toggleUpdateDelete = () => {
        setShowUpdateDelete(!showUpdateDelete);
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
                    <Stack onClick={() => handlePaperClick(member.id)} display='inline-list-item'>
                        <Typography fontSize="20px" fontWeight="bold">
                            Email <br />
                            {member.email}
                        </Typography>
                        {/* <Typography fontSize="18px">
                            User Type: {member.userType}
                        </Typography> */}
                        {showUpdateDelete && (
                            <>
                                <Button onClick={() => handleEditClick(member.id)} color="error" sx={{ marginLeft: '800px', marginBottom: '20px'}}>
                                    <EditIcon />
                                </Button>
                                <Button onClick={() => handleDeleteClick(member.id)} color="error" sx={{marginBottom: '20px'}}>
                                    <DeleteIcon />
                                </Button>
                            </>
                        )}
                        {/* Add other member details here */}
                    </Stack>
                </Paper>
            ))}
        <Stack display='inline-list-item' marginRight='865px'>
            <Button onClick={handleAddMemberClick} variant="contained" color='error' sx={{ backgroundColor: '#ff2625', color: 'white', alignSelf: 'flex-start' }}>
                <AddIcon />
                <Typography>
                    Add member
                </Typography>
            </Button>
            <Button onClick={toggleUpdateDelete} variant="contained" color='error' sx={{ backgroundColor: '#ff2625', color: 'white', alignSelf: 'flex-start', marginLeft: '20px' }}>
                <EditIcon /> &nbsp;
                <Typography>
                    Update
                </Typography>
            </Button>
        </Stack>
    </Stack>
    );
};

export default AdminMember;
