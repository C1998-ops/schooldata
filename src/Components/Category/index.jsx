import React, { useCallback, useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modal/Modal";
import handleErrors from "../utils/ErrorHandler";
import Error from "../utils/Error";
import { categoryUrl, departmetUrl } from "../utils/routes";
import axios from "axios";

const Category = () => {
  const category = {
    "Department Name": "Select Department",
    "Category Name": "",
    "Short Name": "",
    "image Url": "",
    "Is Active": false,
  };
  const [formdata, setFormData] = useState(category);
  const [categoryData, setCategorydata] = useState([]);
  const [uniqueDept, setUniqueDept] = useState([]);
  const [editdata, setEditdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, status } = await axios.get(
          `${categoryUrl}/get/categories`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (status === 200) {
          const result = data?.data ?? [];
          setCategorydata(result);
        }
      } catch (error) {
        console.error("Error fetching departments", error);
        if (error.response) {
          console.error(
            `Error: ${error.response.status}, ${error.response.data?.message}`
          );
        } else if (error.request) {
          // The request was made but no response received
          console.error("No response received", error.request);
        } else {
          // Something went wrong while setting up the request
          console.error("Error setting up request", error.message);
        }
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function handleDepartments() {
      try {
        const { data, status } = await axios.get(
          `${categoryUrl}/current/departments`,
          { headers: { "Content-Type": "application/json" } }
        );
        if (status === 200) {
          setUniqueDept(data?.data ?? []);
        }
      } catch (error) {
        if (error.response) {
          console.error(
            `Error: ${error.response.status}, ${error.response.data?.message}`
          );
        } else if (error.request) {
          // The request was made but no response received
          console.error("No response received", error.request);
        } else {
          // Something went wrong while setting up the request
          console.error("Error setting up request", error.message);
        }
      }
    }
    handleDepartments();
  }, []);

  async function onDelete(index) {
    const { data, status } = await axios.delete(
      `${categoryUrl}/delete/${index}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (data !== null && status === 200) {
      const updatedData = categoryData.filter((_, i) => _["sl.no"] !== index);
      setCategorydata(updatedData);
    }
  }

  function onEdit(rowid) {
    const data = categoryData.find((data) => data["sl.no"] === rowid);
    setFormData(data);
    setOpen(true);
  }

  const onClose = useCallback(() => {
    setOpen(false);
    setEditdata(null);
  }, []);

  useEffect(() => {
    setEditdata(null);
  }, [onClose]);
  async function AddCategory(event) {
    try {
      event.preventDefault();
      const errors = handleErrors(formdata);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      if (editdata !== null) {
        const { data } = await axios.put(
          `${departmetUrl}/update/department/${editdata}`,
          formdata,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (data !== null) {
          setCategorydata((prev) => {
            return prev.map((data) =>
              data["sl.no"] === editdata ? formdata : data
            );
          });
        }
      } else {
        const { status } = await axios.post(`${categoryUrl}/create`, formdata, {
          headers: { "Content-Type": "application/json" },
        });
        if (status === 201) {
          setCategorydata((prev) => {
            return [...prev, formdata];
          });
        }
      }
    } catch (error) {
      console.error(error, "Failed handling errors");
    } finally {
      setFormData({
        "Category Name": "",
        "Department Name": "",
        "image Url": "",
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
    setErrors((prev) => {
      return { ...prev, [name]: "" };
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
          onClick={() => {
            setFormData(category);
            setOpen(true);
          }}
        >
          Add Category
        </button>
      </div>
      <button
        type="button"
        className="bg-yellow-300 text-black font-bold py-4 px-2 rounded cursor-not-allowed"
        disabled
      >
        Refresh
      </button>
      <div className="py-4 w-full">
        <Table
          data={categoryData}
          onEdit={onEdit}
          onDelete={onDelete}
          from="Category"
        />
      </div>
      <Modal isOpen={open} onClose={onClose}>
        <div className="bg-white">
          <h2 className="min-w-[400px] w-full font-bold text-2xl">
            Add Category
          </h2>
          <form onSubmit={AddCategory}>
            <div className="flex space-y-2 flex-col my-2">
              <label htmlFor="Department Name" className="block text-gray-500">
                Department Name
                <select
                  id="Department Name"
                  name="Department Name"
                  className="block w-full"
                  value={formdata["Department Name"] || "Select Department"}
                  onChange={handleChange}
                >
                  <option value={"Select Department"}>Select Department</option>
                  {uniqueDept.map((department, index) => (
                    <option
                      key={department.department_id}
                      value={department["Department Name"]}
                    >
                      {department["Department Name"]}
                    </option>
                  ))}
                </select>
                {errors["Department Name"] && (
                  <Error errors={errors} field={"Department Name"} />
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
                />{" "}
                {errors["Short Name"] && (
                  <Error errors={errors} field={"Short Name"} />
                )}
              </label>
              <label htmlFor="Category Name" className="block text-gray-500">
                Category Name
                <input
                  type="text"
                  name="Category Name"
                  id="Category Name"
                  onChange={handleChange}
                  value={formdata["Category Name"]}
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
                />{" "}
                {errors["Category Name"] && (
                  <Error errors={errors} field={"Category Name"} />
                )}
              </label>
              <label htmlFor="imageUrl" className="block text-gray-500">
                Image Url
                <input
                  type="text"
                  name="image Url"
                  id="imageUrl"
                  onChange={handleChange}
                  value={formdata["image Url"]}
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
                />{" "}
                {errors["image Url"] && (
                  <Error errors={errors} field={"image Url"} />
                )}
              </label>
              <label htmlFor="isActive" className="block text-gray-500">
                <input
                  type="checkbox"
                  name="Is Active"
                  checked={formdata["Is Active"]}
                  onChange={handleChange}
                  className="border mr-2"
                />{" "}
                isActive
                {errors["Is Active"] && (
                  <Error errors={errors} field={"Is Active"} />
                )}
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
