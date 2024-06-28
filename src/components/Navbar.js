import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Menu, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import Logo from '../assets/images/Logo.png';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    const [userType, setUserType] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setLoggedIn(true); // User is logged in
                    setUserId(user.uid); // Set the userId
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userType = userDoc.data().userType; // Assuming 'userType' field exists in user document
                        console.log('User type:', userType); // Debugging log
                        setUserType(userType);
                    }
                } else {
                    setLoggedIn(false); // User is not logged in
                }
            } catch (err) {
                console.error('Failed to fetch user type:', err);
            }
        };

        fetchUserType();
    }, []);

    const navigateBasedOnUserType = () => {
        console.log('Navigating based on user type:', userType); // Debugging log
        if (userType === 'admin') {
            navigate('/admin-dashboard');
        } else if (userType === 'member') {
            navigate(`/dashboard/${userId}`); // Navigate to the member's dashboard with userId
        } else {
            console.error('Unknown user type:', userType); // Debugging log
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAdminLogin = () => {
        navigate('/admin');
        handleMenuClose();
    };

    const handleMemberLogin = () => {
        navigate('/member');
        handleMenuClose();
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            setLoggedIn(false);
            setUserType('');
            navigate('/');
        }).catch((error) => {
            console.error('Failed to log out:', error);
        });
        handleMenuClose();
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
                {loggedIn ? (
                    <a style={{ textDecoration: 'none', color: '#3A1212', cursor: 'pointer' }} onClick={handleLogout}>Logout</a>
                ) : (
                    <a style={{ textDecoration: 'none', color: '#3A1212', cursor: 'pointer' }} onClick={handleMenuClick}>Login</a>
                )}
                {loggedIn && (
                    <Button onClick={navigateBasedOnUserType} variant='containt' color='error' style={{ borderRadius: '50px', marginLeft: '250px' }}>
                        <PersonIcon style={{ cursor: 'pointer', borderRadius: '50px' }} />
                    </Button>
                )}
            </Stack>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {loggedIn ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                    <>
                        <MenuItem onClick={handleAdminLogin}>Admin</MenuItem>
                        <MenuItem onClick={handleMemberLogin}>Member</MenuItem>
                    </>
                )}
            </Menu>
        </Stack>
    );
}

export default Navbar;
