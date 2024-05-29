import React from "react";

const ReportsProjectHistorySection: React.FC = () => {
  return (
    <div className="flex flex-col gap-32 py-44">
      <h2 className="text-center text-heading2 font-medium uppercase">
        Project history
      </h2>
      <div className="w-full max-w-[1187px] mx-auto flex flex-col gap-20">
        <div className="w-full border border-black divide-x divide-black">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black border-dashed">
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Type
                </th>
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Price
                </th>
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Tx
                </th>
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black border-dashed last-of-type:border-0">
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 bg-secondary text-white w-1/4">
                  Repayment
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  12.34 DAI
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  SWK123K...9K8J7H
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  Dec.24th 12:34:56
                </td>
              </tr>
              <tr className="border-b border-black border-dashed last-of-type:border-0">
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 bg-secondary text-white w-1/4">
                  Harvest
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  12.34 DAI
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  SWK123K...9K8J7H
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  Dec.24th 12:34:56
                </td>
              </tr>
              <tr className="border-b border-black border-dashed last-of-type:border-0">
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 bg-secondary text-white w-1/4">
                  Mint
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  12.34 DAI
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  SWK123K...9K8J7H
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  Dec.24th 12:34:56
                </td>
              </tr>
              <tr className="border-b border-black border-dashed last-of-type:border-0">
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 bg-secondary text-white w-1/4">
                  Harvest
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  12.34 DAI
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  SWK123K...9K8J7H
                </td>
                <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                  Dec.24th 12:34:56
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsProjectHistorySection;
