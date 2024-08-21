import React from "react";

const updatesData = [
  {
    text: "There will be an announcement about the project soon.",
    date: "",
    class: "bg-white justify-center text-center",
  },
];

const AccountUpdatesSection: React.FC = () => {
  return (
    <div className="font-functionPro flex flex-col gap-[60px]">
      <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        Update
      </h2>
      <div className="w-full border border-black divide-y divide-black divide-dashed bg-white">
        {updatesData.map((update, index) => (
          <div
            key={index}
            className={`p-6 gap-6 flex items-center justify-between ${update.class ? update.class : ""}`}
          >
            {update.text && (
              <p className="uppercase text-caption desktop:text-body16">
                {update.text}
              </p>
            )}
            {update.date && (
              <p className="uppercase text-caption desktop:text-body16">
                {update.date}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountUpdatesSection;
