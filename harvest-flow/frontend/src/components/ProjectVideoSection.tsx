import React from "react";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectVideoSection: React.FC = () => {
  return (
    <div className="pt-32">
      <div className="max-w-[1008px] mx-auto flex flex-col gap-10">
        <img src={tukTukImage} alt="illustration image" />
      </div>
    </div>
  );
};

export default ProjectVideoSection;
