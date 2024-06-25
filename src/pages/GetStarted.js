import React from 'react'
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import admin from '../assets/icons/admin.jpg'
import members from '../assets/icons/members.webp'

const GetStarted = () => {
    const navigate = useNavigate();

    const handleAdmin = () => {
        navigate('/Admin');
    };

    const handleMember = () => {
        navigate('/Member');
    };

return (
<Stack direction="row" spacing={10} justifyContent="center" alignItems="center" marginTop={15}>
    <Stack
        type="button"
        alignItems="center"
        justifyContent="center"
        className='bodyPart-card'
        sx={
            {
                // border:'4px solid #ff2625', 
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '470px',
                height: '480px',
                cursor: 'pointer', 
                gap: '47px',
            }
        }
        onClick={handleAdmin}
    >
        <img src={admin} alt="dumbbell" style={{ width: '200px', height: '200px'}} />
        <Typography fontSize="24px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
            Admin
        </Typography>
    </Stack>

    <Stack
        type="button"
        alignItems="center"
        justifyContent="center"
        className='bodyPart-card'
        sx={
            {
            // borderTop:'4px solid #ff2625', 
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '470px',
                height: '480px',
                cursor: 'pointer', 
                gap: '47px'
            }
        }
        onClick={handleMember}
    >
        <img src={members} alt="dumbbell" style={{ width: '200px', height: '200px'}} />
        <Typography fontSize="24px" fontWeight="bold" color="#3A1212" textTransform="capitalize">
            Member
        </Typography>
    </Stack>
</Stack>
)
}

export default GetStarted