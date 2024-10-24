import React, { useState } from "react";
import { ScoredetailHeaders } from "../../Components/utils/headers";

const ScoreTable = ({ scoreDetail, addItem }) => {
  const info = {
    cardLabel: "",
    cardColor: "",
    cardValue: "",
    isNegative: false,
  };
  const [cardata, setCarddata] = useState(info);
  const [toggleNegative, setTogglenegative] = useState(false);

  const handleTableChange = (e) => {
    const { name, value } = e.target;
    setCarddata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  function handletoggle(event) {
    const { checked } = event.target;

    setTogglenegative(!toggleNegative);
    setCarddata((prev) => {
      return { ...prev, isNegative: checked };
    });
  }
  function create() {
    addItem(cardata);
    // setCarddata(info);
  }
  return (
    <div className="max-w-full mx-auto py-4">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle  max-h-96">
            <div className="overflow-hidden">
              <table className="md:table-fixed border border-collapse min-w-full divide-gray-200 rel">
                <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                  <tr>
                    {ScoredetailHeaders.map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        {header}
                      </th>
                    ))}
                    <th
                      colSpan={2}
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="h-auto overflow-y-auto">
                  <tr className="p-2 my-2">
                    <td className="w-4 mx-auto whitespace-nowrap py-4 px-6"></td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <label
                        htmlFor="card_title"
                        className={`block text-gray-500 ${
                          info.cardLabel !== "" ? "block" : "hidden"
                        }`}
                      >
                        Label
                      </label>
                      <input
                        type="text"
                        name="cardLabel"
                        id="card_title"
                        placeholder="enter title"
                        onChange={handleTableChange}
                        value={cardata.cardLabel}
                        className="border p-1 text-black outline-blue-50 font-sans w-full"
                      />
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <label
                        htmlFor="card_Color"
                        className="block text-gray-500"
                      >
                        <input
                          type="color"
                          name="cardColor"
                          id="card_Color"
                          onChange={handleTableChange}
                          value={cardata.cardColor}
                          className="border p-1 text-black outline-blue-50 font-sans w-full"
                        />
                      </label>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <label
                        htmlFor="card_Value"
                        className="block text-gray-500"
                      >
                        <input
                          type="text"
                          name="cardValue"
                          id="card_Value"
                          placeholder="enter value"
                          onChange={handleTableChange}
                          value={cardata.cardValue}
                          className="border p-1 text-black outline-blue-50
                        font-sans w-full"
                        />
                      </label>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <label
                        htmlFor="isActiveBtn"
                        className="switch cursor-pointer"
                      >
                        <input
                          id="isActiveBtn"
                          type="checkbox"
                          name="isNegative"
                          className="hidden"
                          checked={cardata.isNegative}
                          onChange={handletoggle}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="px-2 py-2 w-auto text-wrap bg-green-400 text-white rounded-md"
                        onClick={create}
                      >
                        Create
                      </button>
                    </td>
                  </tr>
                  {scoreDetail?.scoreItems.map((data, index) => (
                    <tr className="p-2 my-2" key={`scoreItem-${index}`}>
                      <td className="p-4 leading-tight text-sm font-medium text-black whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-4 leading-tight text-gray-900 font-medium  whitespace-nowrap">
                        {data.cardLabel}
                      </td>
                      <td className="p-4 leading-tight whitespace-nowrap font-medium">
                        {
                          <input
                            type="color"
                            name="cardColor"
                            className="w-full max-w-20 p-1"
                            value={data.cardColor}
                            readOnly
                          />
                        }
                      </td>
                      <td className="p-4 leading-tight whitespace-nowrap font-medium">
                        {data.cardValue}
                      </td>
                      <td className="p-4 leading-tight whitespace-nowrap font-medium">
                        {data.isNegative ? "True" : "False"}
                      </td>
                      <td>
                        <div className="flex p-2 space-x-1">
                          <button
                            type="button"
                            className="bg-blue-300 text-xs text-white px-2 py-1 rounded-sm"
                          >
                            edit
                          </button>
                          <button
                            type="button"
                            className="bg-red-300 text-xs text-white px-2 py-1 rounded-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScoreTable;
