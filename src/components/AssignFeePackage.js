// src/components/AssignFeePackage.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const AssignFeePackage = () => {
    const [memberId, setMemberId] = useState('');
    const [packageId, setPackageId] = useState('');
    const [assignedPackages, setAssignedPackages] = useState([]);

    useEffect(() => {
    const fetchPackages = async () => {
        const querySnapshot = await getDocs(collection(db, 'assignedPackages'));
        setAssignedPackages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchPackages();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, 'assignedPackages'), {
        memberId,
        packageId
        });
        setAssignedPackages([...assignedPackages, { id: docRef.id, memberId, packageId }]);
        setMemberId('');
        setPackageId('');
    } catch (e) {
        console.error('Error adding document: ', e);
    }
    };

    return (
        <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Assign Fee Package
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
                label="Package ID"
                variant="outlined"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
              />
              <Button variant="contained" color="primary" type="submit">
                Assign Package
              </Button>
            </Box>
          </form>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Assigned Packages
          </Typography>
          <List>
            {assignedPackages.map((assignment) => (
              <ListItem key={assignment.id}>
                <ListItemText primary={`Member ID: ${assignment.memberId}, Package ID: ${assignment.packageId}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    );
};

export default AssignFeePackage;
