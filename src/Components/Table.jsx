import React, { useEffect, useState } from "react";
import {
  CategoryHead,
  departmentHead,
  ScoreHead,
  subCategory,
} from "./utils/headers";
const Table = ({ data, onEdit, onDelete, from }) => {
  // Get headers from the keys of object
  const objectMap = {
    subCategory: subCategory,
    Department: departmentHead,
    Category: CategoryHead,
    scoreDetails: ScoreHead,
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  var headers = objectMap[from];

  return (
    <React.Fragment>
      {loading && (
        <div className="min-w-full p-2 flex items-start justify-center">
          <div className="loader"></div>
        </div>
      )}
      <table
        className="table w-full sm:max-w-screen-lg border-collapse  border-gray-300"
        style={{ display: loading ? "none" : "block" }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-lg"
                scope="col"
              >
                {header}
              </th>
            ))}
            <th
              className="border border-gray-300 mx-auto min-w-max text-lg"
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
                className="border border-gray-300"
              >
                {headers.map((header, cellIndex) => (
                  <>
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-2 text-black text-wrap max-w-fit whitespace-nowrap"
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
    </React.Fragment>
  );
};

export default Table;
