import React from "react";

const ProjectLendAHandSection: React.FC = () => {
  return (
    <div className="py-10 desktop:py-20 border-t border-black relative z-10">
      <div className="max-w-[780px] mx-auto flex flex-col gap-16 desktop:gap-32 px-4 desktop:px-0">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 desktop:gap-10 items-center desktop:items-start">
            <div className="w-20 h-20 desktop:w-36 desktop:h-36 bg-white border border-black shrink-0"></div>
            <div className="flex flex-col gap-4">
              <h3 className="text-heading5 desktop:text-heading4 font-medium pr-10 desktop:pr-0">
                Impression of Cambodia and Current Situation
              </h3>
              <p className="hidden desktop:block">
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
          <p className="block desktop:hidden">
            Adipisicing consequat amet dolore tempor ea consectetur labore amet.
            Nulla ipsum dolor commodo ipsum sit non excepteur ut pariatur in
            occaecat dolore. Veniam deserunt dolore deserunt ex. Sunt eiusmod
            deserunt consequat sunt mollit sint non aliquip labore exercitation.
            Veniam Lorem amet occaecat magna pariatur dolor veniam aliquip est
            fugiat. Nisi qui quis voluptate ad consectetur nisi aliqua. Irure
            elit eu irure deserunt qui et ad cupidatat est nisi esse
            exercitation sit.
          </p>
        </div>
        <button className="bg-primary text-heading5 desktop:text-heading3 font-medium uppercase p-8 desktop:p-10 border border-black tracking-wider">
          Lend a hand
        </button>
      </div>
    </div>
  );
};

export default ProjectLendAHandSection;
