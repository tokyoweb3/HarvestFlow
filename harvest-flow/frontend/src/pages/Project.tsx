import React, { useContext, useEffect } from "react";
import Layout from "@src/layouts/Layout";
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
import type { NftContractDetails } from "@harvest-flow/utils";
import { AppContext } from "@src/main";
import type MainController from "@src/MainController";
import ReportsDataHouseSection from "@src/components/ReportsDataHouseSection";
import ReportsProjectHistorySection from "@src/components/ReportsProjectHistorySection";
import FAQPageFAQSection from "@src/components/FAQPageFAQSection";

const Project: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [activeTab, setActiveTab] = React.useState<"overview" | "reports" | "qa">("overview");
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get('address') || '';
  const [contractDetails, setContractDetails] = React.useState<NftContractDetails>(null);

  const loadProjectDetails = () => {
    mainController
      .getDetailedNftContract(contractAddress)
      .then((details) => {
        setContractDetails(details);
      });
  }

  useEffect(() => {
    loadProjectDetails();
  }, [contractAddress]);


  return (
    <Layout>
      <ProjectHero projectContractDetails={contractDetails} refreshData={loadProjectDetails}  />
      <ProjectTabsSection activePage={activeTab} changeTab={setActiveTab} />
      {
        {
          overview:
            <>
              <ProjectPointsSection />
              <ProjectStorySection />
              <ProjectOverviewSection />
              <ProjectScheduleSection />
              <ProjectBorrowerSection />
              <ProjectVideoSection />
              <ProjectSchemeSection />
            </>,
          reports:
            <>
              <ReportsDataHouseSection />
              <ReportsProjectHistorySection projectContractAddress={contractAddress}/>
            </>,
          qa: <FAQPageFAQSection />
        }[activeTab]
      }
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default Project;
