import React from "react";

import NFTCardImage from "../../assets/images/project-pos-nft-card.jpg";

const ProjectPOSSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-20 desktop:pt-[150px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[768px] mx-auto flex flex-col gap-10 desktop:gap-[71px]">
        <div>
          <h2 className="text-bodyLarge desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
            About POS
          </h2>
          <h3 className="text-bodyLarge desktop:text-heading4_28_44 text-center uppercase font-medium tracking-[0.35rem]">
            (Proof of Support)
          </h3>
        </div>
        <div className="flex flex-col desktop:flex-row gap-10 desktop:items-center">
          <img
            src={NFTCardImage}
            alt="NFT Card"
            className="w-full max-w-[253px] desktop:max-w-[208px]"
          />
          <p className="text-bodySmaller">
            When lending cryptocurrency to a project, you&apos;ll receive a POS
            (Proof of Support) as a digital certificate. This POS utilizes NFT
            (Non-Fungible Token) blockchain technology, ensuring both high
            transparency and resistance to tampering. By partnering with unique
            artists and brands for every project, we ensure that each
            certificate is one-of-a-kind and exclusively yours. Holding a POS
            enables your wallet to earn interest/principal and grants access to
            the Owner Page. You also have the option to sell it on external
            markets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPOSSection;
