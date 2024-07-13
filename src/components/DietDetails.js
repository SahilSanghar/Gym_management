import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Stack, Typography } from '@mui/material';

const DietDetails = () => {
    const { userId } = useParams(); // Extract userId from route params
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setError('');
            try {
                const userDocRef = doc(db, 'users', userId); // Use userId to fetch specific user document
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserData();
    }, [userId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    const renderDietDetails = (diet) => {
        switch (diet) {
            case 'Non-Vegetarian':
                return (
                    <Stack>
                    <Typography variant="h6"><b>Breakfast:</b> A boiled egg with brown bread or an omelette with very little oil</Typography>
                    <Typography variant="h6"><b>Lunch:</b> A savoury lemon chicken sandwich</Typography>
                    <Typography variant="h6"><b>Dinner:</b> Malabar fish curry with brown rice</Typography>
                    </Stack>
                );
            case 'Eggitarian':
                return (
                    <Stack>
                        <Typography variant="h6"><b>Breakfast:</b> scrambled eggs with tomatoes, garlic, and mushrooms</Typography>
                        <Typography variant="h6"><b>Lunch:</b> zucchini boats stuffed with spiced lentils, veggies, and feta with a side of tomato soup</Typography>
                        <Typography variant="h6"><b>Dinner:</b> chickpea curry with basmati rice</Typography>
                    </Stack>
                );
            case 'Vegetarian':
                return (
                    <Stack>
                        <Typography variant="h6"><b>Breakfast:</b> Oatmeal for the kiddo and an oatmeal smoothie for us</Typography>
                        <Typography variant="h6"><b>Lunch:</b> Tamarind rice with fryums and cabbage stir fry</Typography>
                        <Typography variant="h6"><b>Dinner:</b> Millet pongal with coconut chutney</Typography>
                    </Stack>
                );
            case 'Vegan':
                return (
                    <Stack>
                        <Typography variant="h6"><b>Breakfast:</b> vegan breakfast sandwich with tofu, lettuce, tomato, turmeric, and a plant-milk chai latte</Typography>
                        <Typography variant="h6"><b>Lunch:</b> spiralized zucchini and quinoa salad with peanut dressing</Typography>
                        <Typography variant="h6"><b>Dinner:</b> red lentil and spinach dal over wild rice</Typography>
                    </Stack>
                );
            case 'Keto':
                return (
                    <Stack>
                        <Typography variant="h6"><b>Breakfast:</b> veggie and egg muffins with tomatoes</Typography>
                        <Typography variant="h6"><b>Lunch:</b> chicken salad with olive oil, feta cheese, olives, and a side salad</Typography>
                        <Typography variant="h6"><b>Dinner:</b> salmon with asparagus cooked in butter</Typography>
                    </Stack>
                );
            default:
                return <Typography>No diet selected</Typography>;
        }
    };

    return (
        <Stack
            justifyContent="center"
            sx={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                width: '470px',
                padding: '20px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                margin: '100px auto',
                gap: '20px',
                textAlign: 'left',
            }}
        >
            <Typography variant="h4" color="textPrimary" textAlign="start" fontWeight='Bold' gutterBottom>
                Diet
            </Typography>
            <Stack spacing={2} paddingLeft={5}>
                {renderDietDetails(userData.selectedDiet)}
            </Stack>
        </Stack>
    );
};

export default DietDetails;
