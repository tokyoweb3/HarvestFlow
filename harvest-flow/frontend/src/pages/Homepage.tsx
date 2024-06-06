import React, { useContext, useEffect } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import HomepageHero from "@src/components/HomepageHero";
import OurProjectsSection from "@src/components/OurProjectsSection";
import AboutHarvestFlowSection from "@src/components/AboutHarvestFlowSection";
import FeaturesSection from "@src/components/FeaturesSection";
import FAQSection from "@src/components/FAQSection";
import HowItWorksSection from "@src/components/HowItWorksSection";
import PartnerSection from "@src/components/PartnerSection";
import Layout from "@src/layouts/Layout";
import MobileVideoBackground from "@src/components/MobileVideoBackground";
import DesktopVideoBackground from "@src/components/DesktopVideoBackground";

const Homepage: React.FC = () => {
  const mainController: MainController = useContext(AppContext);

  useEffect(() => {
    if (!mainController.isWalletConnected()) {
      mainController.enforceWalletConnected();
    }
  }, [mainController]);

  return (
    <Layout overlayingFooter>
      <HomepageHero />
      <OurProjectsSection />
      <AboutHarvestFlowSection />
      <FeaturesSection />
      <FAQSection />
      <HowItWorksSection />
      <PartnerSection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default Homepage;
