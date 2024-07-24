import React from "react";

const updatesData = [
  {
    text: "Enim Lorem enim aute aute officia Lorem ipsum elit pariatur officia voluptate cupidatat.",
    date: "Dec.24th",
  },
  {
    text: "Occaecat minim quis dolor exercitation nostrud tempor dolore.",
    date: "Dec.24th",
  },
  {
    text: "Nisi consequat in Lorem incididunt velit occaecat est proident.",
    date: "Dec.24th",
  },
];

const AccountUpdatesSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
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
