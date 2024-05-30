import React from "react";

export type NFTCardProps = {
  contractAddress: string;
  tokenId: string;
  asset: number;
  imageURL: string;
  investment: number;
  earned: number;
  termStart: Date;
  termEnd: Date;
  apr: number;
};

const NFTCard: React.FC<NFTCardProps> = ({
  contractAddress,
  tokenId,
  asset,
  imageURL,
  investment,
  earned,
  termStart,
  termEnd,
  apr,
}) => {
  const formatTerm = (lendingStart : Date, lendingEnd : Date) => {
    const lendingStartYear = lendingStart.getFullYear();
    const lendingStartMonth = lendingStart.getMonth() + 1;
    const lendingEndYear = lendingEnd.getFullYear();
    const lendingEndMonth = lendingEnd.getMonth() + 1;

    return `${lendingStartYear.toString().substring(2)}.${lendingStartMonth} ~ ${lendingEndYear}.${lendingEndMonth}`;
  };

  return (
    // TODO: navigate to the NFT page
    <div className="p-4 w-full flex flex-col gap-2 border border-black bg-tertiary">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="uppercase">NO. {tokenId}</p>
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
            {formatTerm(termStart, termEnd)}
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
