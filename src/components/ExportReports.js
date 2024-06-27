// src/components/ExportReports.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Box, Button, Container, Typography } from '@mui/material';

const ExportReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
    const fetchReports = async () => {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        setReports(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchReports();
    }, []);

    const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + reports.map(e => e.data).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'reports.csv');
    document.body.appendChild(link);
    link.click();
    };

    return (
    <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Export Reports
            </Typography>
            <Button variant="contained" color="primary" onClick={handleExport}>
                Export Reports
            </Button>
        </Box>
    </Container>
    );
};

export default ExportReports;
