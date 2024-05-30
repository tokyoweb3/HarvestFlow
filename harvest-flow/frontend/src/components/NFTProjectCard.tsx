import React from "react";

export type NFTProjectCardProps = {
  imageURL: string;
  title: string;
  text: string;
};

export const NFTProjectComingSoonCard: React.FC = () => {
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center gap-5 border border-black bg-greyLight">
      <p className="text-heading4 text-center uppercase tracking-wider">
        Coming soon
      </p>
    </div>
  );
};

const NFTProjectCard: React.FC<NFTProjectCardProps> = ({
  imageURL,
  title,
  text,
}) => {
  return (
    <div className="p-4 w-full flex flex-col gap-5 border border-black bg-greyLight">
      <div
        className="w-full h-[300px] bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${imageURL})` }}
      />
      <div className="flex flex-col gap-2">
        <p className="text-caption text-center uppercase">{title}</p>
        <p className="text-heading4 text-center uppercase font-medium tracking-wider">
          {text}
        </p>
      </div>
    </div>
  );
};

export default NFTProjectCard;
