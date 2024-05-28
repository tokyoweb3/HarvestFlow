import React, {useContext} from 'react';
import Layout from "@src/layouts/Layout";
import {Box, Grid, Typography} from "@mui/material";
import BuyPanel from "@src/components/BuyPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@src/components/TabPanel";
import {AppContext} from "@src/main";
import NftHistory from "@src/components/NftHistory";
import { useSearchParams } from "react-router-dom";

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [searchParams] = useSearchParams();
    const contractAddress = searchParams.get('address') || '';

    console.log("contractAddress: ", contractAddress);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Layout>
            <div style={{backgroundImage:"url(/assets/images/favicon.png)"}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} alignContent={"center"}>
                        <Typography variant="h4" gutterBottom>
                            プロジェクトコピー
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <div style={{margin: '20px'}}>
                            <BuyPanel nftContractAddress={contractAddress} />
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={activeTab} onChange={handleChange} centered>
                    <Tab label="Overview" />
                    <Tab label="Reports" />
                    <Tab label="Q&A" />
                </Tabs>
                <TabPanel value={activeTab} index={0}> Overview </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <NftHistory contractAddress={contractAddress} />
                </TabPanel>
                <TabPanel value={activeTab} index={2}> Q&A </TabPanel>
            </Box>
        </Layout>
    );
}

export default Project;