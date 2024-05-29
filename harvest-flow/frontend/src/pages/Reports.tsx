import React from "react";

import Layout from "@src/layouts/Layout";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import ReportsDataHouseSection from "@src/components/ReportsDataHouseSection";
import ReportsProjectHistorySection from "@src/components/ReportsProjectHistorySection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";

const Reports: React.FC = () => {
  return (
    <Layout>
      <ProjectHero />
      <ProjectTabsSection activePage="reports" />
      <ReportsDataHouseSection />
      <ReportsProjectHistorySection />
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default Reports;
