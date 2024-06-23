import React from 'react'
import { Box, Typography, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom'
import HeroBannerImage from '../assets/images/banner.png'
import Navbar from './Navbar';

const HeroBanner = () => {
    const navigate = useNavigate();

    const navigateGetStarted = () => {
        navigate('/getStarted')
    }

return (
<Box>
    <Navbar />
    <Box sx={{
        mt: { lg: '212px', xs: '70px'},
        ml: { sm: '50px' }
    }} position="relative" p="20px">
        <Typography color='#FF2625' fontWeight="600" fontSize="26px">
            Fitness Club
        </Typography>

        <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px'}}} mb="23px" mt="30px">
            Sweat, Smile <br /> And Repeat
        </Typography>

        <Typography fontSize="22px" lineHeight="35px" mb={3}>
            Check out the most effective exercises
        </Typography>

        <Button variant="contained" color='error' onClick={navigateGetStarted} sx={{ backgroundColor: '#ff2625', padding: '10px'}}>
            Get Started
        </Button>

        <Typography
            fontWeight={600}
            color="#ff2625"
            sx={{
                opacity: 0.1,
                display: { lg: 'block', xs: 'none' }
            }}
            fontSize="200px"
            >
                Exercise
            </Typography>

        <img src={HeroBannerImage} alt="banner"
        className="hero-banner-img" />
    </Box>
</Box>
)
}

export default HeroBanner