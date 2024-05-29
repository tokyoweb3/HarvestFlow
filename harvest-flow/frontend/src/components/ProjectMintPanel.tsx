import React from "react";

const TotalSupplyProgressBar: React.FC<{
  totalSupply: number;
  currentSupply: number;
}> = ({ totalSupply, currentSupply }) => {
  const percentage = (currentSupply / totalSupply) * 100;
  const roundedPercentage = Math.round(percentage);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-caption font-medium">Total Supply</p>
        <p className="text-caption">
          <span className="font-medium">{roundedPercentage}%</span> (
          {currentSupply}/{totalSupply})
        </p>
      </div>
      <div className="relative w-full h-5 border border-black">
        <div
          className="absolute top-0 left-0 bottom-0 bg-grey"
          style={{ width: `${roundedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProjectMintPanel: React.FC = () => {
  const totalSupply = 60;
  const currentSupply = 13;

  return (
    <div>
      <div className="w-full bg-white border border-black text-black">
        <div className="border-b border-black py-4 px-6 flex flex-col gap-2">
          <p className="uppercase font-medium text-center">Phase: Allow list</p>
          <p className="text-captionSmall text-center">
            Ending in 22 hours 23 mins 23 seconds
          </p>
        </div>
        <div className="py-6 px-10 border-b border-black flex flex-col gap-6">
          <TotalSupplyProgressBar
            totalSupply={totalSupply}
            currentSupply={currentSupply}
          />
          <p className="text-center uppercase">You can mint: 2 NFTs</p>
          <div className="flex justify-center items-end gap-6 px-6">
            <div className="flex flex-col">
              <p className="text-caption font-medium">Price</p>
              <p className="text-heading3 font-medium">
                8,000 <span className="text-body">DAI</span>
              </p>
            </div>
            <div className="pb-2">
              <div className="border border-black flex divide-x divide-black">
                <button className="p-1 w-6 h-6 flex items-center justify-center">
                  —
                </button>
                <div className="p-1 h-6 flex items-center justify-center flex-1 min-w-[80px]">
                  <p>1</p>
                </div>
                <button className="p-1 w-6 h-6 flex items-center justify-center">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-b border-black divide-y divide-black divide-dashed">
            <p className="text-center uppercase py-3">
              Expected APR: <span className="font-medium">9%</span>
            </p>
            <p className="text-center uppercase py-3">
              Redemption: <span className="font-medium">April, 2027</span>
            </p>
            <p className="text-center uppercase py-3">
              Remaining Term: <span className="font-medium">24 months</span>
            </p>
          </div>
          <div>
            <p className="text-center uppercase py-3">
              Total rewards:{" "}
              <span className="font-medium text-heading3">100</span>{" "}
              <span className="font-medium">DAI</span>
            </p>
          </div>
        </div>
        <div>
          <button className="bg-primary text-black text-heading5 font-medium text-center px-8 py-6 uppercase w-full">
            Mint
          </button>
        </div>
      </div>
      <div className="mt-2 text-white">
        <p className="text-caption">
          Sunt ullamco eiusmod consectetur esse. Aliqua cillum exercitation ut
          minim laborum ea excepteur elit. Est id et sint qui duis do do nisi
          excepteur irure sint duis amet. Officia nostrud in id et consequat
          cillum tempor aliquip. Duis labore nulla pariatur nisi mollit dolor
          exercitation reprehenderit sunt proident Lorem ut do. Consectetur
          aliquip mollit consectetur occaecat commodo do.
        </p>
      </div>
    </div>
  );
};

export default ProjectMintPanel;
