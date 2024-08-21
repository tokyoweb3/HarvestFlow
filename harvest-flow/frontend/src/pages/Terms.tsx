import React from "react";
import Layout from "@src/layouts/Layout";
import UserTermSection from "@src/components/UserTerm";
import DesktopVideoBackground from "@src/components/DesktopVideoBackground";
import MobileVideoBackground from "@src/components/MobileVideoBackground";

const terms: React.FC = () => {
  return (
    <Layout>
      <UserTermSection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default terms;
