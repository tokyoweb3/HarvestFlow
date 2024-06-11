import React from "react";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectVideoSection: React.FC = () => {
  return (
    <div className="pt-20 desktop:pt-32 relative z-10">
      <div className="max-w-[1008px] mx-auto flex flex-col gap-10 px-4 desktop:px-0">
        <img src={tukTukImage} alt="illustration image" />
      </div>
    </div>
  );
};

export default ProjectVideoSection;
