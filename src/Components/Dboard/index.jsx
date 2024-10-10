import React, { useEffect, useState } from "react";
const Dashboard = () => {
  const numbers = ["Departments", "Categories"];
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("initial"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);
  const departmentLength = formData.filter(
    (data) => data["Department Name"]
  ).length;
  const active = formData.filter((data) => data["Is Active"]).length;
  const catLength = formData.filter((data) => data["Category Name"]).length;

  return (
    <div className="h-screen flex-1 p-8">
      <h2 className="text-2xl">Dashboard </h2>
      <div className="sm:flex space-x-4 max-w-md mx-auto box-content">
        {numbers.map((row, rowIndex) => {
          const values = row === "Departments" ? departmentLength : catLength;
          return (
            <div className="my-4">
              <div className="p-8 text-center">
                <div
                  className="flex items-center bg-white p-4 w-full min-w-[220px] rounded-md shadow-lg border"
                  key={rowIndex}
                >
                  <span className="py-2 w-12 h-12 rounded-full bg-blue-400 text-white text-2xl">
                    {values}
                  </span>
                  <div className="ml-2 flex flex-col flex-wrap min-w-fit">
                    <span className="capitalize text-lg">{row}</span>
                    <span className="text-gray-400 text-sm">
                      total active : {active}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
