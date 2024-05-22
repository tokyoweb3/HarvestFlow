import React, {useContext, useEffect} from 'react';
import Layout from "@src/layouts/Layout";
import {Box} from "@mui/material";
import NftHistory from "@src/components/NftHistory";
import MainController from "@src/MainController";
import {AppContext} from "@src/main";
import Dashboard from "@src/components/Dashboard";
import NFTEarn from "@src/components/NFTEarn";
import {UserDetails} from "@harvest-flow/utils";
import {getEquityForNft, getLendingAmountForNft, getClaimableYieldForNft, getTotalYieldForNft, getClaimablePrincipleForNft} from "@src/utils";
import {ethers} from "ethers";

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
            {userDetails && (<NFTEarn
                contractAddress={userDetails.ownedNfts[0].contractAddress}
                tokenId={userDetails.ownedNfts[0].tokenId}
                maturityDateTimestamp={userDetails.ownedNfts[0].lendingData.lendingEnd}
                totalEquity={getEquityForNft(userDetails.ownedNfts[0])}
                lendingAmount={getLendingAmountForNft(userDetails.ownedNfts[0])}
                totalYield={getTotalYieldForNft(userDetails.ownedNfts[0])}
                claimableYield={getClaimableYieldForNft(userDetails.ownedNfts[0])}
                claimablePrinciple={getClaimablePrincipleForNft(userDetails.ownedNfts[0])}
                apr={Number(ethers.utils.formatEther(userDetails.ownedNfts[0].lendingData.yield))*100}
            />)}
        </Layout>
    );
}

export default Account;