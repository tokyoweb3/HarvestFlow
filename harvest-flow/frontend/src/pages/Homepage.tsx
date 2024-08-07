import React from "react";
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
import POSSection from "@src/components/POSSection";
import HowToStartSection from "@src/components/HowToStartSection";

const Homepage: React.FC = () => {

  return (
    <Layout enableIntroAnimation>
      <HomepageHero />
      <OurProjectsSection />
      <AboutHarvestFlowSection />
      <HowItWorksSection />
      <FeaturesSection />
      <POSSection />
      <HowToStartSection />
      <PartnerSection />
      <FAQSection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default Homepage;
