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
import CreateBill from './components/CreateBill';
import AssignFeePackage from './components/AssignFeePackage';
import AssignNotification from './components/AssignNotification';
import ExportReports from './components/ExportReports';
import SupplementStore from './components/SupplementStore';
import DietDetails from './components/DietDetails';
import ViewReport from './components/ViewReport';
import RegisterMember from './components/RegisterMember';

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
                <Route path="/dashboard/:userId/bill" element={<CreateBill />} />
                <Route path="/fee_package" element={<Fees />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/basic-details" element={<BasicDetailsForm />} />
                <Route path="/admin-details" element={<AdminDetailsForm />} />
                <Route path="/admin/member" element={<AdminMember />} />
                <Route path="/admin/member/add_member" element={<RegisterMember />} />
                <Route path="/edit-member/:userId" element={<EditMemberDetails />} />

                {/* Testing Routes */}
                {/* <Route path="/bill" element={<CreateBill />} /> */}
                <Route path="/assign-fee-package" element={<AssignFeePackage />} />
                <Route path="/assign-notification" element={<AssignNotification />} />
                <Route path="/export-reports" element={<ExportReports />} />
                <Route path="/supplement-store" element={<SupplementStore />} />
                <Route path="/diet-details" element={<DietDetails />} />
            </Routes>
            <Footer />
        </Box>
    );
};

export default App;
