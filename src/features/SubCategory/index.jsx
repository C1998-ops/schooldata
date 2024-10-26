import React, { useCallback, useEffect, useState } from "react";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import { subCategoryUrl } from "../../Components/utils/routes";
import handleErrors from "../../Components/utils/ErrorHandler";
import Error from "../../Components/utils/Error";
import { useFetch } from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast";
import AddButton from "../../Components/Button/Button";
const SubCategory = () => {
  const subCategory = {
    "Department Name": "",
    "Category Name": "",
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

  const toast = useToast();
  const { data: fetchedSubCategory } = useFetch(`${subCategoryUrl}/get/data`);
  const { data: deptfetched } = useFetch(`${subCategoryUrl}/departments`);

  useEffect(() => {
    if (fetchedSubCategory) {
      setData(fetchedSubCategory);
    }
  }, [fetchedSubCategory]);

  useEffect(() => {
    if (deptfetched) {
      setSelectedDepartment(deptfetched);
    }
  }, [deptfetched]);

  useEffect(() => {
    async function fetchCategoriesForDeptartment() {
      try {
        const response = await axios.get(
          `${subCategoryUrl}/get/category?department=${department}`
        );
        const result = response?.data;
        if (response.status === 200) {
          const categoryData = result?.data ?? [];
          setAvailableCategories(categoryData);
          const storedCategories =
            JSON.parse(localStorage.getItem("categoryMap")) || {};
          storedCategories[department] = categoryData;
          localStorage.setItem("categoryMap", JSON.stringify(storedCategories));
        }
      } catch (error) {
        console.error("Error fetching categories for department", error);
      }
    }
    // Fetch categories if department is selected
    if (department && department !== "Select Department") {
      const storedCategories = JSON.parse(localStorage.getItem("categoryMap"));
      if (storedCategories?.[department]) {
        // Use stored categories if they exist for the selected department
        setAvailableCategories(storedCategories[department]);
      } else {
        fetchCategoriesForDeptartment();
      }
    }
  }, [department]);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    if (name === "Department Name") {
      setDepartment(value);
    }
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
    try {
      setEditdata(id);
      const newData = data.find((data) => data["sl.no"] === id);
      setFormData((prev) => ({ ...prev, ...newData }));
      const department = newData["Department Name"];
      const storedCategories = JSON.parse(localStorage.getItem("categoryMap"));
      if (storedCategories?.[department]) {
        setAvailableCategories(storedCategories[department]);
      }
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  async function onDelete(index) {
    try {
      const { data, status } = await axios.delete(
        `${subCategoryUrl}/delete/${index}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (status === 200) {
        toast.success(data?.message);
        setData((prev) => prev.filter((_, i) => _["sl.no"] !== index));
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        toast.error(data?.message);
        console.error("error deleting data", error);
      } else if (status === 500) {
        console.error("unknown error at server s", error);
        toast.error(data?.message);
      } else {
        console.log("error", error);
      }
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
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      if (editdata !== null) {
        const { data, status } = await axios.put(
          `${subCategoryUrl}/update/${editdata}`,
          formdata,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (status === 200 && data !== null) {
          toast.success(data?.message);
          setData((prev) => {
            return prev.map((data) =>
              data["sl.no"] === editdata ? formdata : data
            );
          });
          setOpen(false);
          setEditdata(null);
        }
      } else {
        const { data, status } = await axios.post(
          `${subCategoryUrl}/create`,
          formdata,
          { headers: { "Content-Type": "application/json" } }
        );
        if (status === 201 && data !== null) {
          toast.success(data?.message);
          setData((prev) => {
            return [...prev, formdata];
          });
          setOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response?.data?.message);
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
    <div className="w-full p-4 max-w-sm sm:max-w-screen-md md:max-w-screen-lg">
      <div>
        <h2 className="font-semibold text-2xl"> Sub Categories</h2>
        <div className="flex justify-between min-w-full">
          <h3 className="text-lg text-gray-500">Manage Sub Categories</h3>
          <AddButton category={"SubCategory"} click={handleSubCategory} />
        </div>
      </div>
      <div className="py-2 w-full max-w-md sm:max-w-2xl md:max-w-screen-lg">
        <Table
          onEdit={onEdit}
          onDelete={onDelete}
          data={data}
          from={"subCategory"}
        />
      </div>
      <Modal isOpen={open} onClose={onClose}>
        <h2 className="font-semibold text-2xl">Add Sub Category</h2>
        <div className="bg-white flex place-items-center max-w-sm sm:max-w-screen-sm md:max-w-screen-lg">
          <form onSubmit={AddSubCategory}>
            <div className="flex space-y-2 flex-col my-2">
              <label
                htmlFor="department Name"
                className="block w-full text-gray-500"
              >
                Department
                <select
                  name="Department Name"
                  key={formdata["Department Name"]}
                  id="department Name"
                  defaultValue={formdata["Department Name"]}
                  className="min-w-full py-2"
                  onChange={handleChange}
                  required
                >
                  <option value="Select Department">Select Department</option>
                  {selectDepartment.map((value) => (
                    <option
                      value={`${value["Department Name"]}`}
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
                  key={formdata["Category Name"]}
                  name="Category Name"
                  id="Availabel Categories"
                  defaultValue={formdata["Category Name"]}
                  className="min-w-full py-2"
                  onChange={handleChange}
                >
                  <option value="Select Category">Select Category</option>
                  {availableCategories.length > 0 ? (
                    availableCategories.map((value, index) => (
                      <option value={`${value}`} key={`value_${index}`}>
                        {value}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading categories...</option>
                  )}
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
                  onClick={onClose}
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
