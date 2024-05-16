import React, {useContext, useEffect} from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, } from '@mui/material';
import {AppContext} from "@src/main";
import MainController from "@src/MainController";
import {UserDetails} from "@harvest-flow/utils";

const Dashboard: React.FC = () => {
    const mainController: MainController = useContext(AppContext);
    const [userDetails, setUserDetails] = React.useState<UserDetails>(null);

    useEffect(() => {
        mainController.getUserDetails().then((details) => {
            setUserDetails(details);
        });
    },[]);

    return (
        <Box sx={{ padding: 4, maxWidth: 900, margin: '0 auto' }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="left">
                Dashboard
            </Typography>
            <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardContent sx={{ flex: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item xs={4} textAlign="center">
                                    <Typography variant="body1">TOTAL EQUITY</Typography>
                                    <Typography variant="h3" color="primary">
                                        ${userDetails ? (userDetails.lendingAmount + userDetails.claimableYield + userDetails.claimablePrincipal) : '---'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} textAlign="center">
                                    <Typography variant="body1">Your APR</Typography>
                                    <Typography variant="body1">{userDetails?.apr ?? "--"} % </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="space-between">
                                <Grid item xs={6} textAlign="center">
                                    <Typography variant="body1">Lending</Typography>
                                    <Typography variant="h6">{userDetails?.lendingAmount ?? "----"} DAI</Typography>
                                </Grid>
                                <Grid item xs={6} textAlign="center">
                                    <Typography variant="body1">Total Yield</Typography>
                                    <Typography variant="h6">{userDetails?.totalYield ?? "----"} DAI</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ border: '1px solid #e0e0e0', padding: 2, borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        POINT
                                    </Typography>
                                    <Typography variant="h4">{userDetails?.points ?? "----"} pt</Typography>
                                </Box>
                                <Typography variant="h6" align="center">Rank: {userDetails?.rank ?? "-"}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent sx={{ flex: 1, borderLeft: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
                    <Box textAlign="center">
                        <Typography variant="body1">Claimable Yield: {userDetails?.claimableYield ?? "--"} DAI</Typography>
                        <Typography variant="body1">Claimable Principle: {userDetails?.claimablePrincipal ?? "----"} DAI</Typography>
                        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                            HARVEST
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
