import React from "react";

import tukTukImage from "../../assets/images/tuktuk-single.jpg";

const ReportsDataHouseSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-[112px] relative z-10">
      <h2 className="text-center text-heading4 desktop:text-heading3 font-medium uppercase tracking-[0.35rem]">
        Data report
      </h2>
      <div className="w-full max-w-[1187px] mx-auto flex flex-col gap-[70px]">
        <div className="w-full max-w-[680px] mx-auto">
          <h3 className="text-center text-heading5 desktop:text-body16 font-medium">
            The release status of the vehicle can be checked.
            <br />
            Detailed data is accessible on the Owner Page by connecting your
            wallet holding a POS and selecting the relevant information via the
            Account Page.
          </h3>
        </div>
        <div className="overflow-x-scroll">
          <div className="flex w-full divide-x divide-black">
            <div
              className="w-96 shrink-0 bg-center bg-cover bg-no-repeat border-l border-t border-b border-black"
              style={{ backgroundImage: `url(${tukTukImage})` }}
            ></div>
            <div className="flex-1 shrink-0 border-t border-b border-r border-black">
              <table className="w-full bg-white">
                <thead>
                  <tr className="border-b border-black border-dashed">
                    <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[10px] px-4 border-r border-black">
                      Asset
                    </th>
                    <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[10px] px-4 border-r border-black">
                      DNFT ID
                    </th>
                    <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[10px] px-4 border-r border-black">
                      Vehicle model
                    </th>
                    <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[10px] px-4 border-r border-black">
                      Amount
                    </th>
                    <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[10px] px-4 border-r border-black">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      1
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      Ongoing
                    </td>
                  </tr>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      2
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      Ongoing
                    </td>
                  </tr>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      3
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      Ongoing
                    </td>
                  </tr>
                  <tr className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      4
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      0x..123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      TVS123
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
                      $4350
                    </td>
                    <td className="text-body desktop:text-heading5 uppercase text-center p-8 border-r border-black">
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
