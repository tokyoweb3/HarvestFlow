import React, { useContext, useEffect } from "react";
import ScrollSpy from "react-ui-scrollspy";

import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { UserDetails } from "@harvest-flow/utils";

import Layout from "@src/layouts/Layout";
import AccountNavigation, {
  AccountNavigationLink,
} from "@src/components/AccountNavigation";
import AccountDashboardSection from "@src/components/AccountDashboardSection";
import AccountProjectHistorySection from "@src/components/AccountProjectHistorySection";
import AccountUpdatesSection from "@src/components/AccountUpdatesSection";
import AccountYourNFTSection from "@src/components/AccountYourNFTSection";
import DesktopVideoBackground from "@src/components/DesktopVideoBackground";
import MobileVideoBackground from "@src/components/MobileVideoBackground";
import AccountUpcomingProjectsSection from "@src/components/AccountUpcomingProjectsSection";

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
      <div className="w-full max-w-[1320px] mx-auto relative z-10">
        <div className="flex gap-32 pt-[216px] pb-56">
          <div className="flex-1 shrink-0 relative hidden desktop:block">
            <div className="sticky top-32">
              <AccountNavigation />
            </div>
          </div>
          <div className="w-full max-w-[926px] *:flex *:flex-col *:gap-[85px]">
            <ScrollSpy scrollThrottle={150}>
              <div
                className="gsap-section-trigger"
                id={AccountNavigationLink.Dashboard}
              >
                <AccountDashboardSection userDetails={userDetails} />
              </div>
              <div
                className="gsap-section-trigger"
                id={AccountNavigationLink.ProjectHistory}
              >
                <AccountProjectHistorySection />
              </div>
              <div
                className="gsap-section-trigger"
                id={AccountNavigationLink.Update}
              >
                <AccountUpdatesSection />
              </div>
              {userDetails && (
                <div
                  className="gsap-section-trigger"
                  id={AccountNavigationLink.YourNFT}
                >
                  <AccountYourNFTSection ownedNfts={userDetails.ownedNfts} />
                </div>
              )}
              <div
                className="gsap-section-trigger"
                id={AccountNavigationLink.UpcomingProjects}
              >
                <AccountUpcomingProjectsSection />
              </div>
            </ScrollSpy>
          </div>
        </div>
      </div>
      <DesktopVideoBackground />
      <MobileVideoBackground />
    </Layout>
  );
};

export default Account;
