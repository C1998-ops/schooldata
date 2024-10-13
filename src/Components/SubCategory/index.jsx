import React, { useCallback, useEffect, useState } from "react";
import Table from "../Table";
import Modal from "../Modal/Modal";
import axios from "axios";
import { subCategoryUrl } from "../utils/routes";
import handleErrors from "../utils/ErrorHandler";
import Error from "../utils/Error";

const SubCategory = () => {
  const subCategory = {
    "Department Name": "Select Department",
    "Category Name": "Select Category",
    "SubCategory Name": "",
    "Short Name": "",
    "Is Active": false,
  };
  const [formdata, setFormData] = useState(subCategory);

  const [data, setData] = useState([]);
  const [editdata, setEditdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectDepartment, setSelectedDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    async function retireveSubCategories() {
      const { data, status } = await axios.get(`${subCategoryUrl}/get/data`, {
        headers: { "Content-Type": "application/json" },
      });
      if (status === 200) {
        const table = data?.data ?? [];
        setData(table);
      }
    }
    retireveSubCategories();
  }, []);

  useEffect(() => {
    async function fetchAvailabeldept() {
      const { data, status } = await axios.get(`${subCategoryUrl}/departments`);
      if (status === 200) {
        const departmentAvailabel = data?.data.map((data) => data) ?? [];
        setSelectedDepartment(departmentAvailabel);
      }
    }
    fetchAvailabeldept();
  }, []);
  useEffect(() => {
    if (department) {
      async function fetchCategories() {
        const response = await axios.get(`${subCategoryUrl}/get/${department}`);
        if (response.status === 200) {
          setAvailableCategories(response.data?.data ?? []);
        }
      }
      fetchCategories();
    }
  }, [department]);

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setDepartment(department);
    const departmentValue = selectDepartment.find(
      (data) => data.department_id === department
    );
    setFormData((prev) => {
      return { ...prev, "Department Name": departmentValue["Department Name"] };
    });
  };

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubCategory() {
    setFormData(subCategory);
    setOpen(true);
  }
  const onEdit = async (id) => {
    setEditdata(id);
    setFormData(data.find((data) => data["sl.no"] === id));
    setOpen(true);
  };

  async function onDelete(index) {
    const response = await axios.delete(`${subCategoryUrl}/delete/${index}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      const updatedData = data.filter((_, i) => _["sl.no"] !== index);
      setData(updatedData);
    }
  }
  const onClose = useCallback(() => {
    setOpen(false);
    setEditdata(null);
  }, []);

  useEffect(() => {
    setEditdata(null);
  }, [onClose]);

  async function AddSubCategory(event) {
    try {
      event.preventDefault();
      const errors = handleErrors(formdata);
      console.log(errors);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      if (editdata !== null) {
        const { data, status } = await axios.put(
          `${subCategoryUrl}/update/${editdata}`,
          { formdata },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (status === 200 && data !== null) {
          setData((prev) => {
            return prev.map((data) =>
              data["sl.no"] === editdata ? formdata : data
            );
          });
        }
      } else {
        const { data, status } = await axios.post(
          `${subCategoryUrl}/create`,
          formdata,
          { headers: { "Content-Type": "application/json" } }
        );
        if (status === 201 && data !== null) {
          setData((prev) => {
            return [...prev, formdata];
          });
        }
      }
    } catch (error) {
      console.error(error);
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
    } finally {
      setFormData(subCategory);
    }
  }

  return (
    <div className="min-w-full p-4">
      <div className="w-full container">
        <h1 className="text-2xl font-semibold mb-4"> Sub Categories</h1>
        <div className="flex justify-between w-full">
          <h3 className="text-lg">Manage Sub Categories</h3>
          <button
            type="button"
            className="bg-blue-900 text-white font-bold py-4 px-2 rounded"
            onClick={handleSubCategory}
          >
            Add Sub Category
          </button>
        </div>
        <button
          type="button"
          className="bg-yellow-300 text-black font-bold py-4 px-2 rounded cursor-not-allowed"
        >
          Refresh
        </button>
      </div>
      <div className="py-4 max-w-screen-lg">
        <Table
          onEdit={onEdit}
          onDelete={onDelete}
          data={data}
          from={"subCategory"}
        />
      </div>
      <Modal isOpen={open} onClose={onClose}>
        <div className="bg-white">
          <h2 className="w-full sm:min-w-[440px] font-bold text-2xl">
            Add Sub Category
          </h2>
          <form onSubmit={AddSubCategory}>
            <div className="flex space-y-4 flex-col my-2">
              <label
                htmlFor="department Name"
                className="block w-full text-gray-500"
              >
                Department
                <select
                  name="Department Name"
                  id="department Name"
                  defaultValue={formdata["Department Name"]}
                  className="min-w-full py-2"
                  onChange={handleDepartmentChange}
                  required
                >
                  <option value="Select Department">Select Department</option>
                  {selectDepartment.map((value) => (
                    <option
                      value={`${value["department_id"]}`}
                      key={value.department_id}
                    >
                      {value["Department Name"]}
                    </option>
                  ))}
                </select>
                {errors["Department Name"] && (
                  <Error field={"Department Name"} errors={errors} />
                )}
              </label>
              <label
                htmlFor="Availabel Categories"
                className="block w-full text-gray-500"
              >
                Category
                <select
                  name="Category Name"
                  id="Availabel Categories"
                  defaultValue={formdata["Category Name"] || "Select Category"}
                  className="min-w-full py-2"
                  onChange={handleChange}
                >
                  <option value="Select Category">Select Category</option>
                  {availableCategories.map((value, index) => (
                    <option value={`${value}`} key={`value_${index}`}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors["Category Name"] && (
                  <Error field={"Category Name"} errors={errors} />
                )}
              </label>
              <label htmlFor="subCategory" className="block text-gray-500">
                Sub Category Name
                <input
                  type="text"
                  name="SubCategory Name"
                  id="subCategory"
                  className="border p-1 text-black outline-blue-50 font-sans w-full"
                  onChange={handleChange}
                  value={formdata["SubCategory Name"]}
                />
                {errors["SubCategory Name"] && (
                  <Error field={"SubCategory Name"} errors={errors} />
                )}
              </label>
              <label htmlFor="Short Name" className="block text-gray-500">
                Sub Category short Name
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

export default SubCategory;
