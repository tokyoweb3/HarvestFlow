import React from "react";

import point1Image from "../../assets/images/key-point-1.jpg";
import point2Image from "../../assets/images/key-point-2.jpg";
import point3Image from "../../assets/images/key-point-3.jpg";

const ProjectPointsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-28 relative z-10 max-w-[1080px] mx-auto">
      <h2 className="text-center text-heading4 desktop:text-heading2 font-medium uppercase">
        Points
      </h2>
      <div className="flex border border-black divide-x divide-black">
        <div className="flex-1 flex flex-col gap-6 p-8 bg-white">
          <h3 className="text-center text-heading5 desktop:text-heading4 font-medium uppercase">
            Key point 1
          </h3>
          <div className="flex flex-col gap-4 items-center">
            <img
              src={point1Image}
              alt="illustration image"
              className="rounded-full max-w-[155px] max-h-[155px] w-full"
            />
            <p className="text-caption desktop:text-body">
              Phnom Penh, the capital of Cambodia, has achieved a high economic
              growth rate of 7% (GDP).
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 p-8 bg-white">
          <h3 className="text-center text-heading5 desktop:text-heading4 font-medium uppercase">
            Key point 2
          </h3>
          <div className="flex flex-col gap-4 items-center">
            <img
              src={point2Image}
              alt="illustration image"
              className="rounded-full max-w-[155px] max-h-[155px] w-full"
            />
            <p className="text-caption desktop:text-body">
              Advanced IoT technology is utilized for managing tuk tuk vehicles,
              and a scholarship program is introduced to support drivers.
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 p-8 bg-white">
          <h3 className="text-center text-heading5 desktop:text-heading4 font-medium uppercase">
            Key point 3
          </h3>
          <div className="flex flex-col gap-4 items-center">
            <img
              src={point3Image}
              alt="illustration image"
              className="rounded-full max-w-[155px] max-h-[155px] w-full"
            />
            <p className="text-caption desktop:text-body">
              An official partnership established with Global Mobility Service,
              a prominent FinTech company in Japan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPointsSection;
