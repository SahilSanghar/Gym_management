// src/components/CreateBill.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const CreateBill = () => {
    const [memberId, setMemberId] = useState('');
    const [amount, setAmount] = useState('');
    const [bills, setBills] = useState([]);

    useEffect(() => {
    const fetchBills = async () => {
        const querySnapshot = await getDocs(collection(db, 'bills'));
        setBills(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBills();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, 'bills'), {
        memberId,
        amount
        });
        setBills([...bills, { id: docRef.id, memberId, amount }]);
        setMemberId('');
        setAmount('');
    } catch (e) {
        console.error('Error adding document: ', e);
    }
    };

    return (
    <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Create Bill
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
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                Create Bill
                </Button>
            </Box>
        </form>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Bills
            </Typography>
            <List>
            {bills.map((bill) => (
                <ListItem key={bill.id}>
                <ListItemText primary={`Member ID: ${bill.memberId}, Amount: ${bill.amount}`} />
                </ListItem>
            ))}
            </List>
        </Box>
    </Container>
    );
};

export default CreateBill;
