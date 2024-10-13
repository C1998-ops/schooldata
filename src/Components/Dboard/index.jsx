import React, { useEffect, useState } from "react";
import { departmetUrl, subCategoryUrl } from "../utils/routes";
import axios from "axios";
const Dashboard = () => {
  const headers = ["Departments", "Categories", "Sub Categories"];
  const [formData, setFormData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  console.log(formData);
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
    return <p>Loading dashboard data ....</p>;
  }
  if (error !== null) {
    return <span>{error}</span>;
  }
  return (
    <div className="h-screen flex-1 p-8">
      <h2 className="text-2xl">Dashboard </h2>
      <div className="sm:flex space-x-4 max-w-md mx-auto box-content">
        {headers.map((row, rowIndex) => {
          const values = formData[row].total;
          const active = formData[row].totalActive;
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
