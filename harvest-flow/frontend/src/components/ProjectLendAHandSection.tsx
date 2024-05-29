import React from "react";

const ProjectLendAHandSection: React.FC = () => {
  return (
    <div className="py-20 border-t border-black">
      <div className="max-w-[780px] mx-auto flex flex-col gap-32">
        <div className="flex gap-10">
          <div className="w-36 h-36 bg-white border border-black shrink-0"></div>
          <div className="flex flex-col gap-4">
            <h3 className="text-heading4 font-medium">
              Impression of Cambodia and Current Situation
            </h3>
            <p>
              Adipisicing consequat amet dolore tempor ea consectetur labore
              amet. Nulla ipsum dolor commodo ipsum sit non excepteur ut
              pariatur in occaecat dolore. Veniam deserunt dolore deserunt ex.
              Sunt eiusmod deserunt consequat sunt mollit sint non aliquip
              labore exercitation. Veniam Lorem amet occaecat magna pariatur
              dolor veniam aliquip est fugiat. Nisi qui quis voluptate ad
              consectetur nisi aliqua. Irure elit eu irure deserunt qui et ad
              cupidatat est nisi esse exercitation sit.
            </p>
          </div>
        </div>
        <button className="bg-primary text-heading3 font-medium uppercase p-10 border border-black tracking-wider">
          Lend a hand
        </button>
      </div>
    </div>
  );
};

export default ProjectLendAHandSection;
