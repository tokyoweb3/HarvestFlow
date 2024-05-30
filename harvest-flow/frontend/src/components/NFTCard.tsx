import React from "react";

export type NFTCardProps = {
  position: number;
  asset: number;
  imageURL: string;
  investment: number;
  earned: number;
  termStart: string;
  termEnd: string;
  apr: number;
};

const NFTCard: React.FC<NFTCardProps> = ({
  position,
  asset,
  imageURL,
  investment,
  earned,
  termStart,
  termEnd,
  apr,
}) => {
  return (
    <div className="p-4 w-full flex flex-col gap-2 border border-black bg-tertiary">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="uppercase">NO. {position}</p>
          <p className="uppercase">ASSET: {asset}</p>
        </div>
        <div
          className="w-full h-[300px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      </div>
      <div className="flex flex-col divide-y divide-black divide-dashed">
        <p className="uppercase text-center py-2">
          Investment: <span className="font-medium">{investment} DAI</span>
        </p>
        <p className="uppercase text-center py-2">
          Earned: <span className="font-medium">{earned} DAI</span>
        </p>
        <p className="uppercase text-center py-2">
          Term:{" "}
          <span className="font-medium">
            {termStart} ~ {termEnd}
          </span>
        </p>
        <p className="uppercase text-center py-2">
          APR: <span className="font-medium">{apr}%</span>
        </p>
      </div>
    </div>
  );
};


export default NFTCard;
