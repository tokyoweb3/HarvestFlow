import React from "react";

export type NFTItemCardProps = {
  imageURL: string;
  title: string;
  text: string;
  caption: string;
};

const NFTItemCard: React.FC<NFTItemCardProps> = ({
  imageURL,
  title,
  text,
  caption,
}) => {
  return (
    <div className="pt-[16px] pb-[22px] px-[14px] w-full flex flex-col gap-[20px] border border-black bg-secondary text-white rounded-[10px]">
      <div className="flex flex-col gap-[14px]">
        <p className="text-center uppercase text-body15_15">{title}</p>
        <div
          className="w-full h-[300px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      </div>
      <div className="flex flex-col gap-[14px]">
        <p className="text-heading4Smaller text-center uppercase font-normal tracking-wider">
          {text}
        </p>
        <p className="text-bodySmaller text-center uppercase">{caption}</p>
      </div>
    </div>
  );
};

export default NFTItemCard;
