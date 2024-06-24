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
import { AppContext } from "@src/main";
import type MainController from "@src/MainController";
import type { NftContractDetails } from "@harvest-flow/utils";
import MobileVideoBackground from "@src/components/MobileVideoBackground";
import DesktopVideoBackground from "@src/components/DesktopVideoBackground";

const Project: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get("address") || "";
  const [projectContractDetails, setProjectContractDetails] =
    React.useState<NftContractDetails | null>(null);

  const loadContractDetails = () => {
    mainController.getDetailedNftContract(contractAddress).then((details) => {
      setProjectContractDetails(details);
    });
  };

  useEffect(() => {
    loadContractDetails();
  }, [contractAddress]);

  return (
    <Layout>
      <ProjectHero
        projectContractDetails={projectContractDetails}
        refreshData={loadContractDetails}
      />
      <ProjectTabsSection activePage="overview" />
      <ProjectPointsSection />
      <ProjectStorySection />
      <ProjectOverviewSection projectContractDetails={projectContractDetails} />
      <ProjectScheduleSection />
      <ProjectBorrowerSection />
      <ProjectVideoSection />
      <ProjectSchemeSection />
      <ProjectLendAHandSection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default Project;
