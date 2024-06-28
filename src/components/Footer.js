import React from 'react'
import { Box, Stack, Typography } from '@mui/material';

import Logo from '../assets/images/Logo-1.png'

const Footer = () => {
return (
    <Box mt="80px" bgcolor="#fff3f4">
        <Stack gap="20px" display='flex' direction='row' alignItems="center" px="40px" py="24px" marginLeft='600px'>
            <img src={Logo} alt='logo' width="200px" height="40px" />
            <Typography variant='span' paddingBottom='20px'>
                &copy;
            </Typography>
        </Stack>
    </Box>
)
}

export default Footer