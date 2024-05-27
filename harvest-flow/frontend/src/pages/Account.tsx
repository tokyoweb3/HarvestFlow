import React, { useContext, useEffect } from "react";
import Layout from "@src/layouts/Layout";
import { Box } from "@mui/material";
import NftHistory from "@src/components/NftHistory";
import MainController from "@src/MainController";
import { AppContext } from "@src/main";
import Dashboard from "@src/components/Dashboard";
import { UserDetails } from "@harvest-flow/utils";

const Account: React.FC = () => {
    const mainController: MainController = useContext(AppContext);

    const [userDetails, setUserDetails] = React.useState<UserDetails>(null);


    useEffect(() => {
        mainController.getUserDetails().then((details) => {
            setUserDetails(details);
        });
    },[]);

    return (
        <Layout>
            <div className={"borderBottom"}>
                Every Friday is Harvest Time! Harvest now and get a <strong>+10% Bonus!</strong>
            </div>
            <Dashboard userDetails={userDetails}  />
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
        </Layout>
    );
}

export default Account;