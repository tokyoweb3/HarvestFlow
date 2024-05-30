import React from "react";

const AccountNavigation: React.FC = () => {
  return (
    <ul className="flex flex-col gap-5">
      <li className="text-heading5 font-medium uppercase text-secondary">
        Dashboard
      </li>
      <li className="text-heading5 font-medium uppercase">Project history</li>
      <li className="text-heading5 font-medium uppercase">Update</li>
      <li className="text-heading5 font-medium uppercase">Your NFT</li>
      <li className="text-heading5 font-medium uppercase">Upcoming projects</li>
    </ul>
  );
};

export default AccountNavigation;
