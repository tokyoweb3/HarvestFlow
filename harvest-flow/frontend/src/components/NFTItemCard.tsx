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
    <div className="p-4 w-full flex flex-col gap-5 border border-black bg-secondary text-white">
      <div className="flex flex-col gap-4">
        <p className="text-center uppercase">{title}</p>
        <div
          className="w-full h-[300px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-heading4 text-center uppercase font-medium tracking-wider">
          {text}
        </p>
        <p className="text-caption text-center uppercase">{caption}</p>
      </div>
    </div>
  );
};

export default NFTItemCard;
