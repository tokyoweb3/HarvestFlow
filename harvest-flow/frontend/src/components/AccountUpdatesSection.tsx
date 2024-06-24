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
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h2 className="text-center text-heading4 desktop:text-heading3 font-medium uppercase">
          Update
        </h2>
        <h3 className="text-center text-heading5 desktop:text-heading4 font-medium">
          Updates from the project.
        </h3>
      </div>
      <div className="w-full border border-black divide-y divide-black divide-dashed bg-white">
        {updatesData.map((update, index) => (
          <div
            key={index}
            className="p-6 gap-6 flex items-center justify-between"
          >
            <p className="uppercase text-caption desktop:text-body">
              {update.text}
            </p>
            <p className="uppercase text-caption desktop:text-body">
              {update.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountUpdatesSection;
