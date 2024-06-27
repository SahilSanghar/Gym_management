// src/components/DietDetails.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const DietDetails = () => {
    const [memberId, setMemberId] = useState('');
    const [diet, setDiet] = useState('');
    const [diets, setDiets] = useState([]);

    useEffect(() => {
    const fetchDiets = async () => {
        const querySnapshot = await getDocs(collection(db, 'diets'));
        setDiets(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDiets();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, 'diets'), {
        memberId,
        diet
        });
        setDiets([...diets, { id: docRef.id, memberId, diet }]);
        setMemberId('');
        setDiet('');
    } catch (e) {
        console.error('Error adding document: ', e);
    }
    };

    return (
    <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Diet Details
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
                label="Diet Details"
                variant="outlined"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Add Diet
                </Button>
            </Box>
        </form>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Diets
        </Typography>
            <List>
                {diets.map((diet) => (
                <ListItem key={diet.id}>
                    <ListItemText primary={`Member ID: ${diet.memberId}, Diet: ${diet.diet}`} />
                </ListItem>
                ))}
            </List>
        </Box>
    </Container>
    );
};

export default DietDetails;
