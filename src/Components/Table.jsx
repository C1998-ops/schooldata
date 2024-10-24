import React from "react";
import {
  CategoryHead,
  departmentHead,
  ScoreHead,
  subCategory,
} from "./utils/headers";
const Table = ({ data, onEdit, onDelete, from, loader }) => {
  // Get headers from the keys of object
  const objectMap = {
    subCategory: subCategory,
    Department: departmentHead,
    Category: CategoryHead,
    scoreDetails: ScoreHead,
  };

  var headers = objectMap[from];
  function handleDelete(rowIndex) {
    if (typeof rowIndex !== "undefined") {
      onDelete(rowIndex);
    }
  }

  return (
    <React.Fragment>
      {loader ? (
        <div className="min-w-full p-1 md:p-4 flex items-start justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="bg-white mt-4 overflow-auto">
          <div className="relative overflow-auto">
            <div className="overflow-x-auto overflow-y-auto bg-gray-50 rounded-md">
              <table
                className="table-fixed  w-full border-collapse border border-gray-400 sm:max-w-screen-md md:max-w-screen-lg"
                style={{ display: "table" }}
              >
                <thead>
                  <tr className="text-center text-xs md:text-sm font-semibold text-white bg-dark-purple">
                    {headers.map((header, index) => (
                      <th key={index} className="whitespace-nowrap" scope="col">
                        <span className="block px-3 py-2 border-r">
                          {header}
                        </span>
                      </th>
                    ))}
                    <th
                      className="border border-gray-300 px-3 py-2"
                      colSpan={2}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data.map((row, rowIndex) => (
                      <tr
                        key={`rowIndex-${rowIndex}`}
                        className="border-b border-gray-300 text-center text-xs md:text-sm text-gray-600"
                      >
                        {headers.map((header, cellIndex) => (
                          <>
                            <td
                              key={cellIndex}
                              className=" px-4 py-2 text-black whitespace-pre-wrap"
                            >
                              {header === "sl.no"
                                ? rowIndex + 1
                                : row[header] !== undefined &&
                                  row[header] !== null
                                ? row[header].toString()
                                : ""}
                            </td>
                          </>
                        ))}{" "}
                        <td className="relative flex items-center justify-center space-x-1 py-2">
                          <button
                            type="button"
                            className="bg-orange-500 px-2 py-1 text-xs  font-semibold rounded-md hover:bg-orange-400 text-white focus:outline-none"
                            onClick={() => onEdit(row["sl.no"])}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 px-2 py-1 text-xs font-semibold rounded-md  hover:bg-red-400 text-white focus:outline-none"
                            onClick={() => handleDelete(row["sl.no"])}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Table;
