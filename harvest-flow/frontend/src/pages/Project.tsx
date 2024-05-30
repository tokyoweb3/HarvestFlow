import React from "react";
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

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [searchParams] = useSearchParams();
    const contractAddress = searchParams.get('address') || '';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Layout>
      <ProjectHero projectContractAddress={contractAddress}  />
      <ProjectTabsSection activePage="overview" />
      <ProjectPointsSection />
      <ProjectStorySection />
      <ProjectOverviewSection />
      <ProjectScheduleSection />
      <ProjectBorrowerSection />
      <ProjectVideoSection />
      <ProjectSchemeSection />
      <ProjectLendAHandSection />
    </Layout>
  );
};

export default Project;
