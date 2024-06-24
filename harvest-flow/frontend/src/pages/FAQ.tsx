import React, { useContext, useEffect } from "react";

import Layout from "@src/layouts/Layout";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import FAQPageFAQSection from "@src/components/FAQPageFAQSection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";
import { useSearchParams } from "react-router-dom";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftContractDetails } from "@harvest-flow/utils";
import DesktopVideoBackground from "@src/components/DesktopVideoBackground";
import MobileVideoBackground from "@src/components/MobileVideoBackground";

const FAQ: React.FC = () => {
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
      <ProjectTabsSection activePage="qa" />
      <FAQPageFAQSection />
      <ProjectLendAHandSection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default FAQ;
