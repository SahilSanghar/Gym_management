import React, { useEffect, useState } from 'react'
import {  Box, Pagination, Typography, Stack } from '@mui/material'

import { excerciseOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
return (
    <Box id="exercises"
        sx={{mt: { lg: '110px' }}}
        mt="50px"
        p="20px"
    >
        <Typography variant='h3' mb="46px">
            Showing Results
        </Typography>

        <Stack direction="row" sx={{ gap: { lg: '100px', xs: '50px'}}}
        flexWrap="wrap" justifyContent="center">
            {exercises.map((exercise, idx) => (
                <ExerciseCard key={idx} exercise={exercise} /> 
            ))}
        </Stack>
    </Box>
)
}

export default Exercises