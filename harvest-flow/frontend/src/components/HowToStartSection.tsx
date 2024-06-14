import React from "react";

import SectionHeader from "./SectionHeader";

const HowToStartSection: React.FC = () => {
  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col">
      <SectionHeader title="How to start" />
      <div className="py-16 desktop:py-32 flex-1 desktop:flex desktop:flex-col desktop:justify-center">
        <div className="max-w-[1188px] px-4 desktop:px-0 w-full mx-auto overflow-x-auto">
          <div className="grid grid-cols-[65vw_65vw_65vw_65vw_5vw] desktop:grid-cols-4 grid-rows-1">
            <div className="relative">
              <div className="absolute h-[calc(100%-40px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-20 bg-[#E6B95F] relative p-8 flex items-center rounded-tr-full rounded-br-full border border-black">
                <p className="text-heading5 desktop:text-heading4 uppercase font-medium">
                  Step 1
                </p>
              </div>
              <div className="w-full h-20 bg-[#325AB4] border-l border-black border-b"></div>
              <div className="w-full h-20 bg-[#5A7ED0] border-l border-black border-b"></div>
              <div className="w-full h-20 bg-[#1C1C64] border-l border-black border-b"></div>
              <div className="px-10 py-8 flex flex-col gap-10 border-l border-black">
                <h3 className="text-heading5 desktop:text-heading4 uppercase font-medium">
                  Lending Application
                </h3>
                <div className="flex flex-col gap-6">
                  <p>
                    After agreeing to the terms of use on the project page that
                    is currently accepting applications, select the amount and
                    apply (MINT).
                  </p>
                  <p className="text-caption">
                    *Please ensure that you hold the cryptocurrency. accepted by
                    the project on the supported blockchain.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute h-[calc(100%-120px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-20 bg-transparent"></div>
              <div className="w-full h-20 bg-[#325AB4] relative p-8 flex items-center rounded-tr-full rounded-br-full border border-black border-l-0">
                <p className="text-heading5 desktop:text-heading4 uppercase font-medium text-white">
                  Step 2
                </p>
              </div>
              <div className="w-full h-20 bg-[#5A7ED0] border-b border-black"></div>
              <div className="w-full h-20 bg-[#1C1C64] border-t border-black"></div>
              <div className="px-10 py-8 flex flex-col gap-10">
                <h3 className="text-heading5 desktop:text-heading4 uppercase font-medium">
                  Proof of Support (POS)NFT Issuance
                </h3>
                <div className="flex flex-col gap-6">
                  <p className="text-caption">
                    A POS NFT will be issued to the wallet used for lending.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute h-[calc(100%-200px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-20 bg-transparent"></div>
              <div className="w-full h-20 bg-transparent"></div>
              <div className="w-full h-20 bg-[#5A7ED0] relative p-8 flex items-center rounded-tr-full rounded-br-full border border-black border-l-0">
                <p className="text-heading5 desktop:text-heading4 uppercase font-medium text-white">
                  Step 3
                </p>
              </div>
              <div className="w-full h-20 bg-[#1C1C64]"></div>
              <div className="px-10 py-8 flex flex-col gap-10">
                <h3 className="text-heading5 desktop:text-heading4 uppercase font-medium">
                  Receiving Yield and Principal
                </h3>
                <div className="flex flex-col gap-6">
                  <p className="text-caption">
                    To claim the yield and principal, connect the wallet holding
                    the POS and access the account page.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute h-[calc(100%-280px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-20 bg-transparent"></div>
              <div className="w-full h-20 bg-transparent"></div>
              <div className="w-full h-20 bg-transparent"></div>
              <div className="w-full h-20 bg-[#1C1C64] relative p-8 flex items-center rounded-tr-full rounded-br-full border border-black border-l-0">
                <p className="text-heading5 desktop:text-heading4 uppercase font-medium text-white">
                  Step 4
                </p>
              </div>
              <div className="px-10 py-8 flex flex-col gap-10">
                <h3 className="text-heading5 desktop:text-heading4 uppercase font-medium">
                  Checking Project Details
                </h3>
                <div className="flex flex-col gap-6">
                  <p className="text-caption">
                    You can view project and/or RWA details via the Owner Page.
                  </p>
                </div>
              </div>
            </div>
            <div className="block desktop:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToStartSection;
