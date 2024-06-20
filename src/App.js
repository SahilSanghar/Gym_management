import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ViewMembers from './components/ViewMembers';
import Login from './components/Login';
import Register from './components/Register';
import ViewBills from './components/ViewBills';
import AddBill from './components/AddBill';

const App = () => {
return (
    <Box width="400px" sx={{ width: { xl: '1488px' }}} m="auto" >
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/members" component={ViewMembers} />
            <Route path="/bills" component={ViewBills} />
            <Route path="/add-bill" component={AddBill} />
            <Route path="/" component={Login} />
        </Routes>
        <Footer />
    </Box>
)
}

export default App