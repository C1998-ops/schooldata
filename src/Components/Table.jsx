import React from "react";
import { CategoryHead, departmentHead, subCategory } from "./utils/headers";
const Table = ({ data, onEdit, onDelete, from }) => {
  // Get headers from the keys of object
  const objectMap = {
    subCategory: subCategory,
    Department: departmentHead,
    Category: CategoryHead,
  };
  var headers = objectMap[from];

  return (
    <div>
      <table className="table min-w-[900px] w-full sm:max-w-screen-lg border-collapse border border-gray-300">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
            <th className="border border-gray-300 mx-auto w-fit" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300">
              {headers.map((header, cellIndex) => (
                <>
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2 text-wrap max-w-fit"
                  >
                    {header === "sl.no"
                      ? rowIndex + 1
                      : row[header] !== undefined && row[header] !== null
                      ? row[header].toString()
                      : ""}
                  </td>
                </>
              ))}{" "}
              <td>
                <button
                  type="button"
                  className="bg-orange-400 px-4 py-2 text-xs rounded"
                  onClick={() => onEdit(row["sl.no"])}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 text-xs rounded"
                  onClick={() => onDelete(row["sl.no"])}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
