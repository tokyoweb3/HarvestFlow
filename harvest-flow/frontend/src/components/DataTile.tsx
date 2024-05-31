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
  value?: string;
  size?: "xxs" | "xs" | "small" | "large";
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
      return "p-16";
    }

    return "p-8";
  };

  const getTextSizeFromSize = () => {
    if (size === "xxs") {
      return "text-heading5";
    }

    if (size === "xs") {
      return "text-heading4";
    }

    if (size === "large") {
      return "text-heading1";
    }

    return "text-heading3";
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
      <TileHeader title={title} />
      <div className="flex items-center justify-center flex-1">
        {customComponent ?? <TileValue value={value} size={size} />}
      </div>
    </div>
  );
};

export default DataTile;
