import React, { useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modal/Modal";
export const initialData = [
  {
    "sl.no": 1,
    "Department Name": "Mathematic Department",
    "Short Name": "Maths",
    "Is Active": true,
  },
  {
    "sl.no": 2,
    "Department Name": "IOT",
    "Short Name": "IOT",
    "Is Active": true,
  },
  {
    "sl.no": 3,
    "Department Name": "IT Departmentt",
    "Short Name": "IT",
    "Is Active": true,
  },
];
function Department() {
  const [open, setOpen] = useState(false);

  const departmentInfo = {
    "Department Name": "",
    "Short Name": "",
    "Is Active": false,
  };

  const [tableData, setTableData] = useState(initialData);
  const [editData, setEditData] = useState(null);
  const [formdata, setFormData] = useState(departmentInfo);

  const onEdit = (id) => {
    setEditData(id);
    setOpen(true);
    setFormData(tableData[id]);
  };
  useEffect(() => {
    function handleEdit() {
      setEditData(null);
    }
    handleEdit();
  }, [editData, open, formdata]);
  const onDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };
  function onClose() {
    setOpen(false);
  }
  function AddDepartment(event) {
    event.preventDefault();
    if (editData !== null) {
      setTableData((empArr) =>
        empArr.map((value, index) => (index === editData ? formdata : value))
      );
    } else {
      setTableData((prevData) => {
        return [
          ...prevData,
          {
            ...formdata,
            "sl.no": prevData.length + 1,
          },
        ];
      });

      setFormData({
        "sl.no": "",
        "Department Name": "",
        "Short Name": "",
        "Is Active": false,
      });
    }
  }
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  }
  return (
    <div className="w-full p-8">
      <h1 className="font-extrabold"> Departments</h1>
      <div className="flex justify-between">
        <h3 className="text-lg ">Manage Departments</h3>
        <button
          type="button"
          className="bg-blue-900 text-white font-bold py-4 px-2 rounded"
          onClick={() => setOpen(true)}
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
      <div className="py-4 w-full">
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
              </label>
              <label htmlFor="start time" className="block text-gray-500">
                Start Time
                <input
                  type="time"
                  name="startTime"
                  id="start time"
                  className="w-full outline-blue-50 text-black"
                />
              </label>
              <label htmlFor="start time" className="block text-gray-500">
                End Time
                <input
                  type="time"
                  name="endTime"
                  id="end time"
                  className="w-full outline-blue-50 text-black"
                />
              </label>
              <label htmlFor="isActive" className="block text-gray-500">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formdata["Is Active"]}
                  onChange={handleChange}
                  className="border mr-2"
                />
                {""}
                isActive
              </label>
              <label htmlFor="isActive" className="block text-gray-500">
                Working Days (Select Multiple: CTRL+click)
                <select
                  name="workndays"
                  id="days"
                  multiple
                  className="w-full outline-none"
                >
                  <option value="monday" selected>
                    Monday
                  </option>
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
