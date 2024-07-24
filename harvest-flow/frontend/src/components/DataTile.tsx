import React, { useId } from "react";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

const TooltipIcon = () => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 0.854492C4.01109 0.854492 3.0444 1.14763 2.22215 1.69682C1.3999 2.24602 0.759043 3.02662 0.380605 3.9399C0.00216642 4.85318 -0.0968502 5.85813 0.0960758 6.82767C0.289002 7.7972 0.765206 8.68778 1.46447 9.38678C2.16373 10.0858 3.05465 10.5618 4.02455 10.7546C4.99445 10.9475 5.99979 10.8485 6.91342 10.4702C7.82705 10.0919 8.60794 9.45131 9.15735 8.62938C9.70676 7.80745 10 6.84112 10 5.85259C9.9986 4.52744 9.47137 3.25697 8.53399 2.31995C7.59661 1.38292 6.32565 0.855892 5 0.854492ZM4.80769 3.16131C4.9218 3.16131 5.03334 3.19513 5.12821 3.2585C5.22309 3.32187 5.29703 3.41194 5.3407 3.51731C5.38437 3.62269 5.39579 3.73865 5.37353 3.85052C5.35127 3.96239 5.29632 4.06515 5.21564 4.1458C5.13496 4.22645 5.03216 4.28138 4.92025 4.30363C4.80833 4.32588 4.69233 4.31446 4.58691 4.27081C4.4815 4.22716 4.39139 4.15325 4.328 4.05841C4.26461 3.96357 4.23077 3.85207 4.23077 3.73801C4.23077 3.58506 4.29155 3.43837 4.39975 3.33022C4.50794 3.22207 4.65468 3.16131 4.80769 3.16131ZM5.38462 8.54387C5.1806 8.54387 4.98495 8.46286 4.84069 8.31865C4.69643 8.17445 4.61539 7.97887 4.61539 7.77493V5.85259C4.51338 5.85259 4.41555 5.81208 4.34342 5.73998C4.27129 5.66788 4.23077 5.57009 4.23077 5.46812C4.23077 5.36615 4.27129 5.26836 4.34342 5.19626C4.41555 5.12416 4.51338 5.08365 4.61539 5.08365C4.8194 5.08365 5.01506 5.16466 5.15931 5.30887C5.30357 5.45307 5.38462 5.64865 5.38462 5.85259V7.77493C5.48662 7.77493 5.58445 7.81544 5.65658 7.88754C5.72871 7.95964 5.76923 8.05743 5.76923 8.1594C5.76923 8.26137 5.72871 8.35916 5.65658 8.43126C5.58445 8.50337 5.48662 8.54387 5.38462 8.54387Z"
        fill="black"
        fillOpacity="0.3"
      />
    </svg>
  );
};

type TileHeaderProps = {
  title: string;
  tooltipText?: string;
};

const TileHeader: React.FC<TileHeaderProps> = ({ title, tooltipText }) => {
  const tooltipID = useId();

  return (
    <div className="px-6 py-[10px] border-b border-black border-dashed flex items-center justify-center">
      <p className="text-center uppercase text-caption desktop:text-caption relative">
        {title}
        {tooltipText && (
          <>
            <div
              className="absolute w-[12px] h-[12px] flex items-center justify-center top-0 -right-4 bottom-0 my-auto hover:cursor-pointer"
              data-tooltip-id={tooltipID}
              data-tooltip-content={tooltipText}
            >
              <TooltipIcon />
            </div>
            <Tooltip id={tooltipID} />
          </>
        )}
      </p>
    </div>
  );
};

type TileValueProps = {
  value?: string;
  size?: "xxs" | "xs" | "xs24" | "small" | "large";
};

const TileValue: React.FC<TileValueProps> = ({ value, size = "small" }) => {
  const getPaddingFromSize = () => {
    if (size === "xxs") {
      return "p-4";
    }

    if (size === "xs") {
      return "p-6";
    }

    if (size === "large") {
      return "p-8 desktop:p-16";
    }

    return "p-8";
  };

  const getTextSizeFromSize = () => {
    if (size === "xxs") {
      return "text-heading5LH22";
    }

    if (size === "xs") {
      return "text-heading5";
    }

    if (size === "xs24") {
      return "text-heading4Smaller";
    }

    if (size === "large") {
      return "text-heading3 desktop:text-heading2_43";
    }

    return "text-body desktop:text-heading3";
  };

  if (!value) return null;

  return (
    <div
      className={clsx(
        "flex items-center justify-center flex-1",
        getPaddingFromSize(),
      )}
    >
      <p className={clsx("text-center uppercase", getTextSizeFromSize())}>
        {value}
      </p>
    </div>
  );
};

export type DataTileProps = TileHeaderProps &
  TileValueProps & {
    wrapperClassName?: string;
    customComponent?: React.ReactNode;
  };

const DataTile: React.FC<DataTileProps> = ({
  title,
  tooltipText,
  value,
  size,
  wrapperClassName,
  customComponent,
}) => {
  return (
    <div
      className={clsx(
        "border-t border-l border-black flex flex-col",
        wrapperClassName,
      )}
    >
      <TileHeader title={title} tooltipText={tooltipText} />
      <div className="flex items-center justify-center flex-1">
        {customComponent ?? <TileValue value={value} size={size} />}
      </div>
    </div>
  );
};

export default DataTile;
