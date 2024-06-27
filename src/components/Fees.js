import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';

const Fees = () => {
    return (
        <Grid container spacing={1} justifyContent="center" marginY="170px" marginX={3}>
            {/* 3 Month Package */}
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{height: '400px', width: '400px'}}>
                    <CardHeader
                        title="STARTER"
                        titleTypographyProps={{ align: 'center' }}
                        subheader="$97/Month"
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Typography variant="body2" color="textSecondary" component="p">
                                The STARTER program is for someone starting <br />
                                out their fitness journey. This program <br />
                                teaches the habits necessary to make <br />
                                healthy lifestyle changes, but without the <br />
                                accountability of coach check-ins.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="ul" paddingLeft={4} paddingTop={2}>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Workout Program
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Video Demos of Exercise
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Nutrition Plan
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Lifestyle Habit Coaching
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Healthy Recipes
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Fitness Tips
                                </Typography>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 6 Month Package */}
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{height: '400px', width: '400px'}}>
                    <CardHeader
                        title="PREMIUM"
                        titleTypographyProps={{ align: 'center' }}
                        subheader="$199/Month"
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Typography variant="body2" color="textSecondary" component="p">
                                The PREMIUM program is perfect for someone <br />
                                with ambitious goals that wants serious <br />
                                results. This program inculdes accountability. <br />
                                Coach check-ins and is perfect to help you <br />
                                succeed
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="ul" paddingLeft={4} paddingTop={2}>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Customized Workout Program <br />
                                    (Monthly Progressions).
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Video Demos of Exercise
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Customized Nutrition Plan
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Lifestyle Habit Coaching
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Healthy Recipes
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Fitness Tips
                                </Typography>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 12 Month Package */}
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{height: '400px', width: '400px'}}>
                    <CardHeader
                        title="ELITE"
                        titleTypographyProps={{ align: 'center' }}
                        subheader="$399/Month"
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Typography variant="body2" color="textSecondary" component="p">
                                The ELITE program is designed to deliver you <br />
                                the best results possible with all the tools <br />
                                necessary to maximize your true body' <br />
                                potential. Perfect for the competitor and <br />
                                serious lifter
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="ul" paddingLeft={4} paddingTop={2}>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Customized Workout Program <br />
                                    (Bi-Weekly Progressions).
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Video Demos of Exercise
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Customized Nutrition Plan <br />
                                    (With Adjustments)
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Healthy Recipes
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="li">
                                    Fitness Tips
                                </Typography>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Fees;
