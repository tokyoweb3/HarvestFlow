import React, {useContext, useEffect} from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, } from '@mui/material';
import {AppContext} from "@src/main";
import MainController from "@src/MainController";
import {UserDetails} from "@harvest-flow/utils";
import {
    getClaimablePrincipleForUser,
    getClaimableYieldForUser,
    getTotalEquity,
    getTotalLendingAmount,
    getTotalYieldForUser
} from "@src/utils";
import {ethers} from "ethers";
import {NUMBER_OF_DECIMAL_PLACES} from "@src/utils/constants";

const Dashboard: React.FC = () => {
    const mainController: MainController = useContext(AppContext);
    const [userDetails, setUserDetails] = React.useState<UserDetails>(null);

    const claimYield = async () => {
        // TODO: Implement yield claiming
    }

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
                                        ${userDetails ? getTotalEquity(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : '---'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} textAlign="center">
                                    <Typography variant="body1">Your APR</Typography>
                                    <Typography variant="body1">{userDetails?.ownedNfts.length > 0 ? Number(ethers.utils.formatEther(userDetails.ownedNfts[0].lendingData.yield))*100 : "--" } % </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="space-between">
                                <Grid item xs={6} textAlign="center">
                                    <Typography variant="body1">Lending</Typography>
                                    <Typography variant="h6">{userDetails ? getTotalLendingAmount(userDetails.ownedNfts) : "----"} DAI</Typography>
                                </Grid>
                                <Grid item xs={6} textAlign="center">
                                    <Typography variant="body1">Total Yield</Typography>
                                    <Typography variant="h6">{userDetails ? getTotalYieldForUser(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "----"} DAI</Typography>
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
                        <Typography variant="body1">Claimable Yield: {userDetails ? getClaimableYieldForUser(userDetails.ownedNfts).toFixed(NUMBER_OF_DECIMAL_PLACES) : "--" } DAI</Typography>
                        <Typography variant="body1">Claimable Principle: {userDetails ? getClaimablePrincipleForUser(userDetails.ownedNfts) : "----"} DAI</Typography>
                        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}
                              onClick = {() => claimYield()}
                        >
                            HARVEST
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
