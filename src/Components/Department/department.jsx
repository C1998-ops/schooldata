import React, { useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modal/Modal";
import handleErrors from "../utils/ErrorHandler";
const initialData = [
  {
    "sl.no": 1,
    "Department Name": "Mathematic Department",
    "Short Name": "Maths",
    "Category Name": "Statistics",
    "Is Active": true,
  },
  {
    "sl.no": 2,
    "Department Name": "IOT",
    "Short Name": "IOT",
    "Category Name": "IOT",
    "Is Active": true,
  },
  {
    "sl.no": 3,
    "Department Name": "IT Departmentt",
    "Short Name": "IT",
    "Category Name": "Artificial Intelligence",
    "Is Active": true,
  },
];
function Department() {
  const [open, setOpen] = useState(false);

  const departmentInfo = {
    "Department Name": "",
    "Short Name": "",
    "Is Active": false,
    startTime: "",
    endTime: "",
  };

  const [tableData, setTableData] = useState(initialData);
  const [editData, setEditData] = useState(null);
  const [formdata, setFormData] = useState(departmentInfo);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("initial");
    if (stored) {
      setTableData(JSON.parse(stored));
    } else {
      localStorage.setItem("initial", JSON.stringify(tableData));
    }
  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      localStorage.setItem("initial", JSON.stringify(tableData));
    }
  }, [tableData]);

  const onEdit = (id) => {
    setEditData(id);
    setOpen(true);
    setFormData(tableData[id]);
  };

  const onDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };
  function onClose() {
    setEditData(null);
    setOpen(false);
  }
  function AddDepartment(event) {
    try {
      event.preventDefault();
      if (editData !== null) {
        setTableData((empArr) =>
          empArr.map((value, index) => (index === editData ? formdata : value))
        );
      } else {
        const errors = handleErrors(formdata);
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors);
          return;
        }
        setTableData((prevData) => {
          return [
            ...prevData,
            {
              ...formdata,
              "sl.no": prevData.length + 1,
            },
          ];
        });
      }
    } catch (error) {
      console.error("Failed to save depatemnt", error);
    } finally {
      setFormData({
        "sl.no": "",
        "Department Name": "",
        "Short Name": "",
        "Is Active": false,
        endTime: "",
        startTime: "",
      });
    }
  }
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }
  function handleAdddeptClick() {
    setFormData({
      "sl.no": "",
      "Department Name": "",
      "Short Name": "",
      "Is Active": false,
      startTime: "",
      endTime: "",
    });
    setOpen(true);
  }

  return (
    <div className="w-full p-8 max-h-fit">
      <h1 className="text-2xl font-semibold mb-4"> Departments</h1>
      <div className="flex justify-between">
        <h3 className="text-lg ">Manage Departments</h3>
        <button
          type="button"
          className="bg-blue-900 text-white font-bold py-4 px-2 rounded"
          onClick={handleAdddeptClick}
        >
          Add Department
        </button>
      </div>
      <button
        type="button"
        className="bg-yellow-300 text-black font-bold py-4 px-2 rounded"
      >
        Refresh
      </button>
      <div className="py-4 min-w-max max-w-screen-md">
        <Table data={tableData} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <Modal isOpen={open} onClose={onClose}>
        <div className="bg-white">
          <h2 className="min-w-[400px] w-full font-bold text-2xl">
            Add Department
          </h2>
          <form onSubmit={AddDepartment}>
            <div className="flex space-y-2 flex-col my-2">
              <label htmlFor="Department Name" className="block text-gray-500">
                Department Name
                <input
                  type="text"
                  name="Department Name"
                  id="Department Name"
                  onChange={handleChange}
                  value={formdata["Department Name"]}
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
                />
                {errors["Department Name"] && (
                  <span className="block w-full text-red-500 text-sm">
                    {errors["Department Name"]}
                  </span>
                )}
              </label>
              <label htmlFor="Short Name" className="block text-gray-500">
                Short Name
                <input
                  type="text"
                  name="Short Name"
                  id="Short Name"
                  onChange={handleChange}
                  value={formdata["Short Name"]}
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
                />
                {errors["Short Name"] && (
                  <span className="block w-full text-red-500 text-sm">
                    {errors["Short Name"]}
                  </span>
                )}
              </label>
              <label htmlFor="start time" className="block text-gray-500">
                Start Time
                <input
                  type="time"
                  name="startTime"
                  id="start time"
                  className="w-full outline-blue-50 text-black"
                  onChange={handleChange}
                  value={formdata["startTime"]}
                />
                {errors["startTime"] && (
                  <span className="block w-full text-red-500 text-sm">
                    {errors["startTime"]}
                  </span>
                )}
              </label>
              <label htmlFor="end time" className="block text-gray-500">
                End Time
                <input
                  type="time"
                  name="endTime"
                  id="end time"
                  className="w-full outline-blue-50 text-black"
                  onChange={handleChange}
                  value={formdata["endTime"]}
                />
                {errors["endTime"] && (
                  <span className="block w-full text-red-500 text-sm">
                    {errors["endTime"]}
                  </span>
                )}
              </label>
              <label htmlFor="isActive" className="block text-gray-500">
                <input
                  type="checkbox"
                  name="Is Active"
                  onChange={handleChange}
                  checked={formdata["Is Active"]}
                  className="border mr-2"
                />
                {""}
                isActive
                {errors["Is Active"] && (
                  <span className="block w-full text-red-500 text-sm">
                    z{errors["Is Active"]}
                  </span>
                )}
              </label>
              <label htmlFor="days" className="block text-gray-500">
                Working Days (Select Multiple: CTRL+click)
                <select
                  name="workndays"
                  id="days"
                  multiple
                  className="w-full outline-none"
                  defaultValue={["monday"]}
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">wednesday</option>
                  <option value="thursday">thursday</option>
                  <option value="friday">friday</option>
                  <option value="saturday">saturday</option>
                  <option value="sunday">sunday</option>
                </select>
              </label>
              <div className="right-0 flex justify-end gap-4">
                <button
                  className="bg-gray-400 text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Department;
