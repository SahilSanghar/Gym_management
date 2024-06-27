// src/components/AssignNotification.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const AssignNotification = () => {
    const [memberId, setMemberId] = useState('');
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
    const fetchNotifications = async () => {
        const querySnapshot = await getDocs(collection(db, 'notifications'));
        setNotifications(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchNotifications();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, 'notifications'), {
        memberId,
        message
        });
        setNotifications([...notifications, { id: docRef.id, memberId, message }]);
        setMemberId('');
        setMessage('');
    } catch (e) {
        console.error('Error adding document: ', e);
    }
    };

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Assign Notification
                </Typography>
                <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Member ID"
                        variant="outlined"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                    />
                    <TextField
                        label="Notification Message"
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Assign Notification
                    </Button>
                </Box>
            </form>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Notifications
                </Typography>
                <List>
                    {notifications.map((notification) => (
                    <ListItem key={notification.id}>
                        <ListItemText primary={`Member ID: ${notification.memberId}, Message: ${notification.message}`} />
                    </ListItem>
                ))}
                </List>
            </Box>
        </Container>
    );
};

export default AssignNotification;
