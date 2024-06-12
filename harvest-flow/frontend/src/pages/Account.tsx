import React, { useContext, useEffect } from "react";
import Layout from "@src/layouts/Layout";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { UserDetails } from "@harvest-flow/utils";
import AccountNavigation from "@src/components/AccountNavigation";
import AccountDashboardSection from "@src/components/AccountDashboardSection";
import AccountProjectHistorySection from "@src/components/AccountProjectHistorySection";
import AccountUpdatesSection from "@src/components/AccountUpdatesSection";
import AccountYourNFTSection from "@src/components/AccountYourNFTSection";

const Account: React.FC = () => {
  const mainController: MainController = useContext(AppContext);

  const [userDetails, setUserDetails] = React.useState<UserDetails>(null);

  useEffect(() => {
    mainController.getUserDetails().then((details) => {
      setUserDetails(details);
    });
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-[1320px] mx-auto">
        <div className="flex gap-32 pt-32 pb-56">
          <div className="flex-1 shrink-0 relative hidden desktop:block">
            <div className="sticky top-20">
              <AccountNavigation />
            </div>
          </div>
          <div className="w-full max-w-[1008px] flex flex-col gap-24">
            <AccountDashboardSection userDetails={userDetails} />
            <AccountProjectHistorySection />
            <AccountUpdatesSection />
            {userDetails && (
              <AccountYourNFTSection ownedNfts={userDetails.ownedNfts} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
