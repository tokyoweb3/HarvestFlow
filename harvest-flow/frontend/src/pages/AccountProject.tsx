import React from "react";
import Layout from "@src/layouts/Layout";
import AccountNavigation from "@src/components/AccountNavigation";
import AccountUpdatesSection from "@src/components/AccountUpdatesSection";
import AccountProjectYourNFTSection from "@src/components/AccountProjectYourNFTSection";
import AccountProjectEarnSection from "@src/components/AccountProjectEarnSection";
import AccountProjectRWASection from "@src/components/AccountProjectRWASection";
import AccountProjectAssetOverviewSection from "@src/components/AccountProjectAssetOverviewSection";

const AccountProject: React.FC = () => {
  return (
    <Layout>
      <div className="w-full max-w-[1320px] mx-auto">
        <div className="flex gap-32 pt-32 pb-56">
          <div className="flex-1 shrink-0 relative">
            <div className="sticky top-20">
              <AccountNavigation />
            </div>
          </div>
          <div className="w-full max-w-[1008px] flex flex-col gap-24">
            <AccountProjectYourNFTSection />
            <AccountProjectAssetOverviewSection />
            <AccountProjectEarnSection />
            <AccountProjectRWASection />
            <AccountUpdatesSection />
            <button className="bg-primary flex items-center justify-center border border-black text-heading5 font-medium uppercase tracking-widest p-10">
              Go to project page
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountProject;
