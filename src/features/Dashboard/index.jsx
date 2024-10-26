import React, { useEffect, useState } from "react";
import { departmetUrl } from "../../Components/utils/routes";
import axios from "axios";

const Dashboard = () => {
  const headers = ["Departments", "Categories", "Sub Categories"];
  const [formData, setFormData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data, status } = await axios.get(
          `${departmetUrl}/get/results`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (status === 200) {
          setFormData(data?.data ?? null);
          setloading(false);
        }
      } catch (error) {
        console.error("failed loading data", error);
        setError("Failed to load dashboard data");
        setloading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <p className="text-xl text-gray-500 px-4 py-6">
        Loading dashboard data ....
      </p>
    );
  }
  if (error !== null) {
    return <span className="p-4 text-red-400 text-sm">{error}</span>;
  }

  return (
    <div className="h-full p-2 w-full">
      <h2 className="text-2xl font-semibold text-gray-700">Dashboard </h2>

      <div className="md:flex justify-center items-center space-x-2 w-full sm:max-w-lg md:max-w-screen-lg mx-auto box-content overflow-auto border-none outline-sky-100">
        {headers.map((row, rowIndex) => {
          const values = formData[row].total;
          const active = formData[row].totalActive;
          return (
            <div className="my-4" key={`evol_${rowIndex}`}>
              <div className="p-8 text-center">
                <div
                  className="flex items-center justify-evenly bg-gray-50  p-4 w-60  rounded-sm shadow-lg border outline-none transition duration-100 ease-in-out hover:shadow-md hover:scale-100 "
                  key={rowIndex}
                >
                  <span className="py-2 w-12 h-12 mx-auto rounded-md text-center bg-blue-500 text-white text-2xl">
                    {values}
                  </span>
                  <div className="ml-2 flex flex-col flex-wrap w-full">
                    <span className="capitalize text-lg text-red-800">{row}</span>
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
