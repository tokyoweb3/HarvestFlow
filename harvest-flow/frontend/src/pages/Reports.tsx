import React from "react";

import Layout from "@src/layouts/Layout";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import ReportsDataHouseSection from "@src/components/ReportsDataHouseSection";
import ReportsProjectHistorySection from "@src/components/ReportsProjectHistorySection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";
import { useSearchParams } from "react-router-dom";

const Reports: React.FC = () => {
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get('address') || '';

  return (
    <Layout>
      <ProjectHero projectContractAddress={contractAddress} />
      <ProjectTabsSection activePage="reports" />
      <ReportsDataHouseSection />
      <ReportsProjectHistorySection projectContractAddress={contractAddress}/>
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default Reports;
