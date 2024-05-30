import React from "react";

import Layout from "@src/layouts/Layout";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import FAQPageFAQSection from "@src/components/FAQPageFAQSection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";
import { useSearchParams } from "react-router-dom";

const FAQ: React.FC = () => {
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get('address') || '';

  return (
    <Layout>
      <ProjectHero projectContractAddress={contractAddress} />
      <ProjectTabsSection activePage="qa" />
      <FAQPageFAQSection />
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default FAQ;
