import React from 'react'
import CreateBill from './CreateBill'
import { Box, Typography } from '@mui/material'
import AssignFeePackage from './AssignFeePackage'
import AssignNotification from './AssignNotification'
import ExportReports from './ExportReports'
import SupplementStore from './SupplementStore'
import DietDetails from './DietDetails'

const ViewReport = () => {
return (
    <Box>
    <Typography variant="h3" component="h1" textAlign={'center'} gutterBottom>
        ViewReport
    </Typography>
    {/* <CreateBill /> */}
    <AssignFeePackage />
    <AssignNotification />
    <ExportReports />
    <SupplementStore />
    <DietDetails />
    </Box>
)
}

export default ViewReport