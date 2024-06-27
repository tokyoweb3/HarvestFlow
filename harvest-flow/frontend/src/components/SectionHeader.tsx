import clsx from "clsx";
import React from "react";

type SectionHeaderProps = {
  title: string;
  allowLineBreaks?: boolean;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  allowLineBreaks = false,
}) => {
  return (
    <div className="flex items-center justify-center desktop:border-b desktop:border-black px-6 pt-28 pb-16 desktop:p-6">
      <h2
        className={clsx(
          "text-heading5 desktop:text-body font-medium uppercase text-center tracking-[0.35rem]",
          allowLineBreaks && "whitespace-pre-line",
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
