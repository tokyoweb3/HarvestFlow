import React, {useContext, useEffect} from 'react';
import Layout from "@src/layouts/Layout";
import {Box} from "@mui/material";
import NftHistory from "@src/components/NftHistory";
import MainController from "@src/MainController";
import {AppContext} from "@src/main";
import Dashboard from "@src/components/Dashboard";
import NFTEarn from "@src/components/NFTEarn";

const Account: React.FC = () => {
    const mainController: MainController = useContext(AppContext);

    useEffect(() => {
        if(!mainController.isWalletConnected()){
            mainController.enforceWalletConnected();
        }
    },[]);

    return (
        <Layout>
            <div className={"borderBottom"}>
                Every Friday is Harvest Time! Harvest now and get a <strong>+10% Bonus!</strong>
            </div>
            <Dashboard />
            <Box
                sx={{ flexGrow: 1, display: 'flex'}}
            >
                {
                    mainController.userAddress ?
                    (
                        <NftHistory />
                    )
                    :
                    (
                        <div>
                            <div>Connect Wallet to view your account</div>
                        </div>
                    )
                }

            </Box>
            <NFTEarn />
        </Layout>
    );
}

export default Account;