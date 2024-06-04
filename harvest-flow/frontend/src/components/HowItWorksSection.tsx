import React from "react";

import backgroundImage from "../../assets/images/tuktuk.jpg";

const HowItWorksSection: React.FC = () => {
  return (
    <div className="flex divide-x divide-black border-b border-black">
      <div className="w-1/3">
        <div className="pt-24 px-10 pb-10">
          <div className="flex flex-col gap-24">
            <h3 className="text-heading2 uppercase font-medium tracking-[0.85rem] text-center">
              How
              <br />
              it works
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit,sed do eiusmod tempor
              incididunt ut labore et doloremagna. Nostrud veniam ullamco ut non
              amet amet labore proident ea qui. Aliqua fugiat anim Lorem
              adipisicing reprehenderit et enim magna reprehenderit laborum amet
              proident proident elit. Duis ullamco duis sint tempor et minim ad
              irure quis nisi fugiat proident qui. Voluptate fugiat ut proident
              fugiat cupidatat aliquip ipsum elit irure. Eu excepteur excepteur
              veniam eu excepteur. Deserunt quis dolor mollit reprehenderit
              pariatur tempor laboris est exercitation id excepteur ea. Commodo
              est enim fugiat dolore. Commodo nulla ad duis non ullamco eu
              reprehenderit incididunt duis et nostrud. Ad exercitation et non
              consequat velit. Deserunt aliqua occaecat consectetur sit
              adipisicing consectetur anim exercitation pariatur quis ea sit
              pariatur non. Tempor consectetur veniam officia dolore eu aliquip.
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-2/3 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </div>
  );
};

export default HowItWorksSection;
