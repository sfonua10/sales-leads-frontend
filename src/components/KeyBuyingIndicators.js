import React from "react";

const KeyBuyingIndicators = () => {
  return (
    <>
      <h5 className="mt-8">Information Chart</h5>
      <table className="justify-end">
        <tbody>
          <tr>
            <td className="border px-4 py-2 text-center">
              <input type="checkbox" checked readOnly />
            </td>
            <td className="border px-4 py-2">Only show eligible leads</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 bg-gray-300"></td>
            <td className="border px-4 py-2">Ohio leads at top</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              <div className="text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full text-center">
                HLB
              </div>
            </td>
            <td className="border px-4 py-2">Highly Likely To Buy</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center text-green-600">
              phone
            </td>
            <td className="border px-4 py-2">Prefferred</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center text-red-600">
              carrier pigeon
            </td>
            <td className="border px-4 py-2">Not Prefferred</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default KeyBuyingIndicators;
