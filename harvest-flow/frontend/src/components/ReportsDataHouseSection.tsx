import React from "react";

import tukTukImage from "../../assets/images/tuktuk-single.jpg";

const ReportsDataHouseSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-32">
      <h2 className="text-center text-heading4 desktop:text-heading2 font-medium uppercase">
        Data house
      </h2>
      <div className="w-full max-w-[1187px] mx-auto flex flex-col gap-20">
        <h3 className="text-center text-heading5 desktop:text-heading3 font-medium">
          Monitor other vehicles in-depth data.
        </h3>
        <div className="overflow-x-scroll">
          <div className="flex w-full divide-x divide-black">
            <div
              className="w-96 shrink-0 bg-center bg-cover bg-no-repeat border-l border-t border-b border-black"
              style={{ backgroundImage: `url(${tukTukImage})` }}
            ></div>
            <div className="flex-1 shrink-0 border-t border-b border-r border-black">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black border-dashed">
                    <th className="text-caption desktop:text-body uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0">
                      Asset
                    </th>
                    <th className="text-caption desktop:text-body uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0">
                      DNFT ID
                    </th>
                    <th className="text-caption desktop:text-body uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0">
                      Vehicle model
                    </th>
                    <th className="text-caption desktop:text-body uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0">
                      Amount
                    </th>
                    <th className="text-caption desktop:text-body uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      1
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      Ongoing
                    </td>
                  </tr>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      2
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      Ongoing
                    </td>
                  </tr>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      3
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      Ongoing
                    </td>
                  </tr>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      4
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0">
                      Ongoing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDataHouseSection;
