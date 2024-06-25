import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import Logo from '../assets/images/Logo.png';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setRole(userDoc.data().role); // Assuming 'role' field exists in user document
                    }
                }
            } catch (err) {
                console.error('Failed to fetch user role:', err);
            }
        };

        fetchUserRole();
    }, []);

    const navigateGetStarted = () => {
        if (role === 'admin') {
            navigate('/admin-dashboard');
        } else if (role === 'member') {
            navigate('/dashboard');
        } 
    };

return (
    <Stack direction="row"
    justifyContent="space-around" sx={{ gap: { 
        sm: '122px', xs: '20px'}, mt: { sm: '32px', xs: '20px'}, justifyContent: 'none'}} px="none">
        <Link to="/">
            <img src={Logo} alt="Logo" style={{
                width: '48px', height: '48px', margin: '0 20px'
            }} />
        </Link>
        <Stack
            direction="row"
            gap="40px"
            fontSize="24px"
            alignItems="flex-end"
        >
            <Link to="/" style={{ textDecoration: 'none', color: "#3A1212", borderBottom: '3px solid #FF2625'}}>Home</Link>
            <a href="#exercises" style={{textDecoration: 'none', color: '#3A1212'}}>Exercises</a>
            <PersonIcon style={{ marginLeft: '230px', marginBottom: '10px', cursor: 'pointer' }} onClick={navigateGetStarted} />
        </Stack>
    </Stack>
)
}

export default Navbar