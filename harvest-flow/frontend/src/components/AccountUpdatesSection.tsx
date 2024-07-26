import React from "react";

const updatesData = [
  {
    text: "All vehicles has successfully released.",
    date: "Dec.24th",
  },
  {
    text: "Half of the vehicles has successfully released.",
    date: "Dec.24th",
  },
  {
    text: "Half of the vehicles has successfully released.",
    date: "Dec.24th",
  },
];

const AccountUpdatesSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Update
      </h2>
      <div className="w-full border border-black divide-y divide-black divide-dashed bg-white">
        {updatesData.map((update, index) => (
          <div
            key={index}
            className="p-6 gap-6 flex items-center justify-between"
          >
            <p className="uppercase text-caption desktop:text-body16">
              {update.text}
            </p>
            <p className="uppercase text-caption desktop:text-body16">
              {update.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountUpdatesSection;
