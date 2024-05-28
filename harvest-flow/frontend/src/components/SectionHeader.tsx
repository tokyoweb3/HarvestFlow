import React from "react";

type SectionHeaderProps = {
  title: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center border-b border-black p-6">
      <h2 className="text-header font-medium uppercase text-black text-center tracking-[0.35rem]">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
