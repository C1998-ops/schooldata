import React from "react";

const Table = ({ data, onEdit, onDelete }) => {
  // Get headers from the keys of the first object
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
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
                    {row[header].toString()}{" "}
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
