import clsx from "clsx";
import React from "react";

type TileHeaderProps = {
  title: string;
};

const TileHeader: React.FC<TileHeaderProps> = ({ title }) => {
  return (
    <div className="px-6 py-4 border-b border-black border-dashed flex items-center justify-center">
      <p className="text-center uppercase">{title}</p>
    </div>
  );
};

type TileValueProps = {
  value: string;
  size?: "extra-small" | "small" | "large";
};

const TileValue: React.FC<TileValueProps> = ({ value, size = "small" }) => {
  const getPaddingFromSize = () => {
    if (size === "extra-small") {
      return "p-6";
    }

    if (size === "large") {
      return "p-4";
    }

    return "p-20";
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center flex-1",
        getPaddingFromSize(),
      )}
    >
      <p
        className={clsx(
          "text-center uppercase",
          size === "small" || size === "extra-small"
            ? "text-heading3"
            : "text-heading1",
        )}
      >
        {value}
      </p>
    </div>
  );
};

export type DataTileProps = TileHeaderProps &
  TileValueProps & {
    wrapperClassName?: string;
  };

const DataTile: React.FC<DataTileProps> = ({
  title,
  value,
  size,
  wrapperClassName,
}) => {
  return (
    <div
      className={clsx(
        "border-t border-l border-black flex flex-col",
        wrapperClassName,
      )}
    >
      <TileHeader title={title} />
      <TileValue value={value} size={size} />
    </div>
  );
};

export default DataTile;
