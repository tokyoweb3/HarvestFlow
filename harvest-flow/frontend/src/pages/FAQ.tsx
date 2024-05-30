import React from "react";

import Layout from "@src/layouts/Layout";
import ProjectHero from "@src/components/ProjectHero";
import ProjectTabsSection from "@src/components/ProjectTabsSection";
import FAQPageFAQSection from "@src/components/FAQPageFAQSection";
import ProjectLendAHandSection from "@src/components/ProjectLendAHandSection";

const FAQ: React.FC = () => {
  return (
    <Layout>
      <ProjectHero />
      <ProjectTabsSection activePage="qa" />
      <FAQPageFAQSection />
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default FAQ;
