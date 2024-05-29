import React, { useContext } from "react";
import Layout from "@src/layouts/Layout";
import { Box, Grid, Typography } from "@mui/material";
import BuyPanel from "@src/components/BuyPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@src/components/TabPanel";
import { AppContext } from "@src/main";
import NftHistory from "@src/components/NftHistory";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import ProjectPointsSection from "@src/components/ProjectPointsSection";
import ProjectStorySection from "@src/components/ProjectStorySection";
import ProjectOverviewSection from "@src/components/ProjectOverviewSection";
import ProjectScheduleSection from "@src/components/ProjectScheduleSection";
import ProjectBorrowerSection from "@src/components/ProjectBorrowerSection";
import ProjectSchemeSection from "@src/components/ProjectSchemeSection";
import ProjectVideoSection from "@src/components/ProjectVideoSection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";
import { useSearchParams } from "react-router-dom";

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [searchParams] = useSearchParams();
    const contractAddress = searchParams.get('address') || '';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Layout>
      <ProjectHero />
      <ProjectTabsSection activePage="overview" />
      <ProjectPointsSection />
      <ProjectStorySection />
      <ProjectOverviewSection />
      <ProjectScheduleSection />
      <ProjectBorrowerSection />
      <ProjectVideoSection />
      <ProjectSchemeSection />
      <ProjectLendAHandSection />
      <div style={{ backgroundImage: "url(/assets/images/favicon.png)" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} alignContent={"center"}>
            <Typography variant="h4" gutterBottom>
              プロジェクトコピー
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div style={{ margin: "20px" }}>
              <BuyPanel
                nftContractAddress={contractAddress}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={activeTab} onChange={handleChange} centered>
          <Tab label="Overview" />
          <Tab label="Reports" />
          <Tab label="Q&A" />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          {" "}
          Overview{" "}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <NftHistory contractAddress={contractAddress} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          {" "}
          Q&A{" "}
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default Project;
