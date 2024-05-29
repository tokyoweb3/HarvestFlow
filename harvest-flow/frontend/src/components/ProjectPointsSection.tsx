import React from "react";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectPointsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-32">
      <h2 className="text-center text-heading2 font-medium uppercase">
        Points
      </h2>
      <div className="flex border-t border-b border-black divide-x divide-black">
        <div className="flex-1">
          <img src={tukTukImage} alt="illustration image" />
        </div>
        <div className="flex-1">
          <img src={tukTukImage} alt="illustration image" />
        </div>
        <div className="flex-1">
          <img src={tukTukImage} alt="illustration image" />
        </div>
        <div className="flex-1">
          <img src={tukTukImage} alt="illustration image" />
        </div>
      </div>
    </div>
  );
};

export default ProjectPointsSection;
