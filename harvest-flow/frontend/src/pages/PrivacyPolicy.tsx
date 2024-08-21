import React from "react";
import Layout from "@src/layouts/Layout";
import PrivacyPolicySection from "@src/components/PrivacyPolicy";
import DesktopVideoBackground from "@src/components/DesktopVideoBackground";
import MobileVideoBackground from "@src/components/MobileVideoBackground";

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <PrivacyPolicySection />
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default PrivacyPolicy;
