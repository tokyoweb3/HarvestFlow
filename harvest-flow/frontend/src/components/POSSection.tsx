import React from "react";

import SectionHeader from "./SectionHeader";

const POSSection: React.FC = () => {
  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col desktop:flex-row">
      <div className="w-full desktop:w-1/2 flex flex-col">
        <SectionHeader title="POS（Proof of support）" />
        <div className="flex-1 flex items-center justify-center desktop:max-w-[500px] desktop:mx-auto p-4">
          <p className="text-body text-justify">
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
      <div className="w-full desktop:w-1/2 flex flex-col border-l border-black">
        <SectionHeader title="Social action" />
        <div className="flex-1 flex flex-col gap-6 desktop:gap-10 items-center justify-center desktop:max-w-[500px] desktop:mx-auto p-4">
          <p className="text-body text-justify">
            HARVEST FLOW places a new form of lending and social action, which
            balances economic prosperity with efforts to enhance society, at the
            heart of its mission. We provide a platform that generates use cases
            to enrich the world using cryptocurrencies, which previously had
            limited practical applications.
          </p>
          <div className="flex flex-col gap-4 desktop:gap-6">
            <h2 className="text-heading5 desktop:text-heading4 text-center uppercase font-medium">
              Key Focus Areas for HARVEST FLOW
            </h2>
            <div className="flex flex-wrap desktop:flex-nowrap gap-4 justify-center">
              <div className="w-[30%] desktop:w-[initial] flex flex-col gap-2 items-center">
                <div className="bg-tertiary w-10 h-10 desktop:w-16 desktop:h-16" />
                <h3 className="text-caption font-normal text-center uppercase">
                  WEB3 Social Use Cases
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[initial] flex flex-col gap-2 items-center">
                <div className="bg-tertiary w-10 h-10 desktop:w-16 desktop:h-16" />
                <h3 className="text-caption font-normal text-center uppercase">
                  Financial Inclusion
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[initial] flex flex-col gap-2 items-center">
                <div className="bg-tertiary w-10 h-10 desktop:w-16 desktop:h-16" />
                <h3 className="text-caption font-normal text-center uppercase">
                  Economic Growth
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[initial] flex flex-col gap-2 items-center">
                <div className="bg-tertiary w-10 h-10 desktop:w-16 desktop:h-16" />
                <h3 className="text-caption font-normal text-center uppercase">
                  Transparency
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[initial] flex flex-col gap-2 items-center">
                <div className="bg-tertiary w-10 h-10 desktop:w-16 desktop:h-16" />
                <h3 className="text-caption font-normal text-center uppercase">
                  Art & Culture
                </h3>
              </div>
            </div>
          </div>
          <button className="w-full bg-greySuperLight text-body py-4 desktop:py-6 uppercase font-medium text-center border border-black">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSSection;
