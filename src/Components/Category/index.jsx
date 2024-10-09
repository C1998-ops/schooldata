import React, { useState } from "react";
import { initialData } from "../Department/department";
import Table from "../Table";
import Modal from "../Modal/Modal";
const Category = () => {
  const category = {
    Department: "",
    categoryName: "",
    "Short Name": "",
    "image Url": "",
    "Is Active": false,
  };
  const [formdata, setFormData] = useState(category);

  const [categoryData, setCategorydata] = useState(initialData);
  const [open, setOpen] = useState(false);
  const getUniqueDeps =
    categoryData?.reduce((acc, curr) => {
      if (!acc["Department Name"]) {
        // acc["Department Name"] = [];
        acc.push(curr["Department Name"]);
        return acc;
      }
    }, []) || [];
  function onDelete(index) {
    const updatedData = categoryData.filter((_, i) => i !== index);
    setCategorydata(updatedData);
  }
  function onEdit() {}
  function onClose() {
    setOpen(false);
  }
  function AddCategory() {}
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <div className="w-full p-8">
      <h1 className="font-extrabold"> Category</h1>
      <div className="flex justify-between">
        <h3 className="text-lg ">Manage Category</h3>
        <button
          type="button"
          className="bg-blue-900 text-white font-bold py-4 px-2 rounded"
          onClick={() => setOpen(true)}
        >
          Add Category
        </button>
      </div>
      <button
        type="button"
        className="bg-yellow-300 text-black font-bold py-4 px-2 rounded"
      >
        Refresh
      </button>
      <div className="py-4 w-full">
        <Table data={categoryData} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <Modal isOpen={open} onClose={onClose}>
        <div className="bg-white">
          <h2 className="min-w-[400px] w-full font-bold text-2xl">
            Add Department
          </h2>
          <form onSubmit={AddCategory}>
            <div className="flex space-y-2 flex-col my-2">
              <label htmlFor="Department Name" className="block text-gray-500">
                Department Name
                <select
                  id="Department Name"
                  name="Department Name"
                  className="block w-full"
                >
                  <option value="">Select Department</option>
                  {getUniqueDeps.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
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
              <label htmlFor="Category Name" className="block text-gray-500">
                Short Name
                <input
                  type="text"
                  name="Category Name"
                  id="Category Name"
                  onChange={handleChange}
                  value={formdata["categoryName"]}
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
                />
              </label>
              <label htmlFor="Department Name" className="block text-gray-500">
                Image Url
                <input
                  type="text"
                  name="image Url"
                  id="Department Name"
                  onChange={handleChange}
                  value={formdata["image Url"]}
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
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
};

export default Category;
