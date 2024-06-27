// src/components/SupplementStore.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const SupplementStore = () => {
    const [supplements, setSupplements] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
    const fetchSupplements = async () => {
        const querySnapshot = await getDocs(collection(db, 'supplements'));
        setSupplements(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchSupplements();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, 'supplements'), {
        name,
        price
        });
        setSupplements([...supplements, { id: docRef.id, name, price }]);
        setName('');
        setPrice('');
    } catch (e) {
        console.error('Error adding document: ', e);
    }
    };

    return (
    <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Supplement Store
                </Typography>
            <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Supplement Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />  
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                <Button variant="contained" color="primary" type="submit">
                    Add Supplement
                </Button>
            </Box>
            </form>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Supplements
                </Typography>
            <List>
                {supplements.map((supplement) => (
                <ListItem key={supplement.id}>
                    <ListItemText primary={`Name: ${supplement.name}, Price: ${supplement.price}`} />
                </ListItem>
                ))}
            </List>
        </Box>
    </Container>
    );
};

export default SupplementStore;
