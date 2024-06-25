import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';

const Fees = () => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {/* 3 Month Package */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader
                        title="3 Month Package"
                        titleTypographyProps={{ align: 'center' }}
                        subheader="Price: $200"
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Package details and benefits for 3 months.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 6 Month Package */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader
                        title="6 Month Package"
                        titleTypographyProps={{ align: 'center' }}
                        subheader="Price: $500"
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Package details and benefits for 6 months.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 12 Month Package */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader
                        title="12 Month Package"
                        titleTypographyProps={{ align: 'center' }}
                        subheader="Price: $1000"
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Package details and benefits for 12 months.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Fees;
