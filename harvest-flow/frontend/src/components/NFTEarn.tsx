import React from 'react';
import {Box, Grid, Typography, Button, Divider, CardContent, Card} from '@mui/material';

const NFTEarn : React.FC = () => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 300, padding: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Earn
                </Typography>
                <Grid container alignItems="center">
                    <Typography variant="subtitle2" component="div">
                        TOTAL EQUITY
                    </Typography>
                </Grid>
                <Typography variant="h3" component="div" sx={{ mt: 1, textAlign: 'left' }}>
                    $99.99
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Typography variant="body2">Lending</Typography>
                        </Grid>
                        <Typography variant="h6" sx={{ textAlign: 'left' }}>1,000 DAI</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Typography variant="body2">Total Yield</Typography>
                        </Grid>
                        <Typography variant="h6" sx={{ textAlign: 'left' }}>50 DAI</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2">APR</Typography>
                </Grid>
                <Typography variant="h6" sx={{ textAlign: 'left' }}>8.0%</Typography>
                <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, mt: 2, borderRadius: 1 }}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6}>
                            <Grid container alignItems="center">
                                <Typography variant="body2">Claimable Yield:</Typography>
                            </Grid>
                            <Typography variant="body1">123 DAI</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center">
                                <Typography variant="body2">Claimable Principle:</Typography>
                            </Grid>
                            <Typography variant="body1">1234 DAI</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    HARVEST
                </Button>
            </CardContent>
        </Card>
    );
};

export default NFTEarn;
