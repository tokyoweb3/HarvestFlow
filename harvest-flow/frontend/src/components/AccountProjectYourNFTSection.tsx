import React from "react";

import type { DataTileProps } from "./DataTile";
import DataTile from "./DataTile";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ExtraSmallTile: React.FC<DataTileProps> = ({
  title,
  value,
  customComponent,
}) => {
  return (
    <DataTile
      wrapperClassName="border-t border-l border-black w-full"
      title={title}
      value={value}
      customComponent={customComponent}
      size="xxs"
    />
  );
};

const AccountProjectYourNFTSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h2 className="text-center text-heading3 font-medium uppercase">
          Your NFT
        </h2>
        <h3 className="text-center text-heading4 font-medium">
          Cambodia Tuktuk vol.1 NO.1
        </h3>
      </div>
      <div className="w-full border-b border-black border-l border-r flex">
        <div
          className="w-[40%] bg-center bg-cover bg-no-repeat border-t border-black aspect-square"
          style={{ backgroundImage: `url(${tukTukImage})` }}
        ></div>
        <div className="w-[60%] grid grid-cols-1 grid-rows-3">
          <ExtraSmallTile
            title="Features"
            customComponent={
              <div className="p-6">
                <p>
                  Amet enim velit eiusmod labore adipisicing ut duis culpa
                  cupidatat. Aute adipisicing mollit sint do laboris culpa nulla
                  ut. Non anim incididunt incididunt ipsum officia et tempor
                  culpa labore eiusmod laboris ea id minim.
                </p>
              </div>
            }
          />
          <div className="grid grid-cols-4 grid-rows-1">
            <ExtraSmallTile title="Asset" value="1" />
            <ExtraSmallTile title="Term" value="2024.1 ~ 2026.12" />
            <ExtraSmallTile title="Lending" value="100 DAI" />
            <ExtraSmallTile title="APR" value="8%" />
          </div>
          <button className="bg-primary flex items-center justify-center border-t border-l border-black text-heading4 uppercase tracking-widest">
            Go to project page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProjectYourNFTSection;
