import React from "react";

const Table = ({ data, onEdit, onDelete, from }) => {
  // Get headers from the keys of the first object
  const CategoryHead = [
    "sl.no",
    "Department Name",
    "Short Name",
    "Is Active",
    "Category Name",
  ];
  const departmentHead = [
    "sl.no",
    "Department Name",
    "Short Name",
    "Is Active",
  ];

  const headers = from === "Category" ? CategoryHead : departmentHead;
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
            <th className="border border-gray-300 px-4 py-2" colSpan={2}>
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
                    className="border border-gray-300 px-4 py-2"
                  >
                    {row[header] !== undefined && row[header] !== null
                      ? row[header].toString()
                      : ""}
                  </td>
                </>
              ))}{" "}
              <td>
                <button
                  type="button"
                  className="bg-orange-400 px-4 py-2 text-xs"
                  onClick={() => onEdit(rowIndex)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 text-xs"
                  onClick={() => onDelete(rowIndex)}
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
