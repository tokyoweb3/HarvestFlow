import React from "react";

import CloseIcon from "@src/icons/CloseIcon";

import bgVideo from "../../assets/videos/pc_pale_high.mp4";
import nftImage from "../../assets/images/nft-card.jpg";
import { useNavigate } from "react-router-dom";
import { Page } from "@src/MainController";

const MintedModal : React.FC<{visible : boolean, onClose: () => void }>= ({visible, onClose}) => {
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 w-screen h-screen bg-[#282828] bg-opacity-45 z-50 animate-fade flex flex-col items-center justify-center">
      <div className="w-[80vw] desktop:w-[550px] desktop:h-[550px] flex flex-col relative border border-black divide-y divide-black">
        <div className="h-full w-full absolute left-0 right-0 top-0 bottom-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
        <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6">
          <button
            onClick={() => onClose()}
            className="absolute top-8 right-8 z-10"
          >
            <CloseIcon />
          </button>
          <div className="flex flex-col gap-6 items-center justify-center">
            <h3 className="text-center text-heading5 desktop:text-heading4 font-medium tracking-wider uppercase text-primary">
              Congratulations!
            </h3>
            <div className="flex flex-col gap-4 items-center justify-center">
              <p className="text-center text-heading5 font-normal tracking-wider">
                Minted!
              </p>
              <img src={nftImage} alt="NFT" className="w-full max-w-[255px]" />
            </div>
          </div>
        </div>
        <button className="bg-primary text-black p-6 text-center uppercase hover:cursor-pointer font-medium text-bodyLarge desktop:text-heading5 tracking-wider relative z-10"
          onClick={() =>  navigate(Page.Account) }>
          Go to account page
        </button>
      </div>
    </div>
  );
};

export default MintedModal;
