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
import ProjectDriverInterviewSection from "@src/components/ProjectDriverInterviewSection";
import ProjectPOSSection from "@src/components/ProjectPOSSection";
import ProjectArtistCollaborationSection from "@src/components/ProjectArtistCollaborationSection";
import ProjectAboutTheBorrowerSection from "@src/components/ProjectAboutTheBorrowerSection";
import ProjectHowItWorksSection from "@src/components/ProjectHowItWorksSection";

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

  useEffect(() => {
    // scroll to top of page on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <ProjectHero
        projectContractDetails={projectContractDetails}
        refreshData={loadContractDetails}
      />
      <ProjectTabsSection activePage="overview" />
      <ProjectPointsSection />
      <ProjectOverviewSection projectContractDetails={projectContractDetails} />
      <ProjectScheduleSection />
      <ProjectStorySection />
      <ProjectBorrowerSection />
      <ProjectDriverInterviewSection />
      <ProjectPOSSection />
      <ProjectArtistCollaborationSection />
      <ProjectAboutTheBorrowerSection />
      <ProjectVideoSection />
      <ProjectSchemeSection />
      <ProjectHowItWorksSection />
      <ProjectLendAHandSection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default Project;
