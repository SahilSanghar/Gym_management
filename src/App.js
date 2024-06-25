import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import Footer from './components/Footer';
import AuthAdmin from './components/AuthAdmin';
import AuthMember from './components/AuthMember';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import BasicDetailsForm from './components/BasicDetailsForm';
import AdminDetailsForm from './components/AdminDetailsForm';
import AdminMember from './components/AdminMember';
import MemberDashboard from './components/MemberDashboard';
import EditMemberDetails from './components/EditMemberDetails';
import Fees from './components/Fees';

const App = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: '1488px', margin: 'auto' }}>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
                <Route path="/getStarted" element={<GetStarted />} />
                <Route path="/Admin" element={<AuthAdmin />} />
                <Route path="/Member" element={<AuthMember />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:userId" element={<MemberDashboard />} />
                <Route path="/dashboard/:userId/fee_package" element={<FeePackage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/basic-details" element={<BasicDetailsForm />} />
                <Route path="/admin-details" element={<AdminDetailsForm />} />
                <Route path="/admin/member" element={<AdminMember />} />
                <Route path="/edit-member/:userId" element={<EditMemberDetails />} />
            </Routes>
            <Footer />
        </Box>
    );
};

export default App;
