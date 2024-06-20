import React, { useContext, useEffect } from "react";
// import { Summary } from "@harvest-flow/utils";
import { AppContext } from "@src/main";
import type MainController from "@src/MainController";

const HomepageHeroStatistics: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  // const [summaryData, setSummaryData] = React.useState<Summary | null>(null);

  // useEffect(() => {
  //   mainController.getSummary().then((summary) => {
  //     setSummaryData(summary);
  //   });
  // },[]);

  return (
    <div className="grid grid-rows-2 grid-cols-2 desktop:grid-rows-1 desktop:grid-cols-3 desktop:divide-x desktop:divide-white px-6 desktop:px-32 gap-y-2">
      <div className="px-4 desktop:px-8 col-span-2 desktop:col-span-1">
        <h3 className="text-white uppercase text-bodyLarge text-center">
          Total value loaned
        </h3>
        <h4 className="text-heading3 desktop:text-heading1 font-medium text-center">
          {/* ${summaryData?.totalLoaned ?? "0"} */}
        </h4>
      </div>
      <div className="px-4 desktop:px-8 border-r border-white desktop:border-0">
        <h3 className="text-white uppercase text-bodyLarge text-center">
          Repaid
        </h3>
        <h4 className="text-heading3 desktop:text-heading1 font-medium text-center">
          {/* ${summaryData?.totalRepaid?.toFixed(3) ?? "0"} */}
        </h4>
      </div>
      <div className="px-4 desktop:px-8">
        <h3 className="text-white uppercase text-bodyLarge text-center">
          Holders
        </h3>
        <h4 className="text-heading3 desktop:text-heading1 font-medium text-center">
          {/* {summaryData?.userCount ?? "0"} */}
        </h4>
      </div>
    </div>
  );
};

export default HomepageHeroStatistics;
