import React from "react";

const HomepageHeroStatistics: React.FC = () => {
  return (
    <div className="flex divide-x divide-white justify-center">
      <div className="px-8">
        <h3 className="text-white uppercase text-bodyLarge text-center">
          Total value loaned
        </h3>
        <h4 className="text-heading1 font-medium text-center">$123.456</h4>
      </div>
      <div className="px-8">
        <h3 className="text-white uppercase text-bodyLarge text-center">
          Repaid
        </h3>
        <h4 className="text-heading1 font-medium text-center">$12.345</h4>
      </div>
      <div className="px-8">
        <h3 className="text-white uppercase text-bodyLarge text-center">
          Holders
        </h3>
        <h4 className="text-heading1 font-medium text-center">1,023</h4>
      </div>
    </div>
  );
};

export default HomepageHeroStatistics;
