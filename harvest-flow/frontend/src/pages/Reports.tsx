import React, { useContext, useEffect } from "react";

import Layout from "@src/layouts/Layout";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import ReportsDataHouseSection from "@src/components/ReportsDataHouseSection";
import ReportsProjectHistorySection from "@src/components/ReportsProjectHistorySection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";
import { useSearchParams } from "react-router-dom";
import type { NftContractDetails } from "@harvest-flow/utils";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";

const Reports: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get('address') || '';
  const [projectContractDetails, setProjectContractDetails] = React.useState<NftContractDetails | null>(null);

  const loadContractDetails = () => {
    mainController.getDetailedNftContract(contractAddress).then((details) => {
      setProjectContractDetails(details);
    })
  };

  useEffect(() => {
    loadContractDetails();
  }, [contractAddress]);

  return (
    <Layout>
      <ProjectHero projectContractDetails={projectContractDetails} refreshData={loadContractDetails}  />
      <ProjectTabsSection activePage="reports" />
      <ReportsDataHouseSection />
      <ReportsProjectHistorySection projectContractAddress={contractAddress}/>
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default Reports;
