import React, {useContext} from 'react';
import {Box, Grid, Typography, Button, CardContent, Card} from '@mui/material';
import MainController from "@src/MainController";
import {AppContext} from "@src/main";
import {NUMBER_OF_DECIMAL_PLACES} from "@src/utils/constants";

interface NFTEarnProps {
    tokenId: string;
    contractAddress: string;
    maturityDateTimestamp: number;
    totalEquity: number;
    lendingAmount: number;
    totalYield: number;
    claimableYield: number;
    claimablePrinciple: number;
    apr: number;
}

const NFTEarn : React.FC<NFTEarnProps> = (
    {
        tokenId,
        contractAddress,
        maturityDateTimestamp,
        totalEquity,
        lendingAmount,
        totalYield,
        claimableYield,
        claimablePrinciple,
        apr
    }
) => {
    const mainController: MainController = useContext(AppContext);
    const harvest = () => {
        mainController.harvestToken(contractAddress, maturityDateTimestamp, tokenId);
    }

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
                    ${totalEquity.toFixed(NUMBER_OF_DECIMAL_PLACES)}
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Typography variant="body2">Lending</Typography>
                        </Grid>
                        <Typography variant="h6" sx={{ textAlign: 'left' }}>{lendingAmount.toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Typography variant="body2">Total Yield</Typography>
                        </Grid>
                        <Typography variant="h6" sx={{ textAlign: 'left' }}>{totalYield.toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2">APR</Typography>
                </Grid>
                <Typography variant="h6" sx={{ textAlign: 'left' }}>{apr}%</Typography>
                <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, mt: 2, borderRadius: 1 }}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6}>
                            <Grid container alignItems="center">
                                <Typography variant="body2">Claimable Yield:</Typography>
                            </Grid>
                            <Typography variant="body1">{claimableYield.toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center">
                                <Typography variant="body2">Claimable Principle:</Typography>
                            </Grid>
                            <Typography variant="body1">{claimablePrinciple.toFixed(NUMBER_OF_DECIMAL_PLACES)} DAI</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
                    onClick={harvest}
                >
                    HARVEST
                </Button>
            </CardContent>
        </Card>
    );
};

export default NFTEarn;
