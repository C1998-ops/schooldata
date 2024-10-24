import React, { useCallback, useEffect, useState } from "react";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal/Modal";
import handleErrors from "../../Components/utils/ErrorHandler";
import Error from "../../Components/utils/Error";
import { categoryUrl } from "../../Components/utils/routes";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast";

const Category = () => {
  const category = {
    "Department Name": "",
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
  const toast = useToast();
  // const [formsubmitted,setFormSubmitted]=useState(false)
  const { data: fetchCategories, error } = useFetch(
    `${categoryUrl}/get/categories`
  );

  useEffect(() => {
    if (fetchCategories) {
      setCategorydata(fetchCategories);
    }
  }, [fetchCategories]);

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
      toast.success(data.message);
      setCategorydata((prev) => prev.filter((_, id) => _["sl.no"] !== index));
    }
  }

  function onEdit(rowid) {
    setEditdata(rowid);
    const selectedData = categoryData.find((data) => data["sl.no"] === rowid);
    setFormData((prevState) => ({
      ...prevState,
      "Department Name": selectedData["Department Name"] || "",
      "Category Name": selectedData["Category Name"] || "",
      "Short Name": selectedData["Short Name"] || "",
      "image Url": selectedData["image Url"] || "",
      "Is Active": selectedData["Is Active"] || false,
    }));
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
        const { data, status } = await axios.put(
          `${categoryUrl}/update/Category/${editdata}`,
          formdata,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (data !== null && status === 200) {
          toast.success("Category data updated successfull !");
          setCategorydata((prev) => {
            return prev.map((data) =>
              data["sl.no"] === editdata ? formdata : data
            );
          });
          setOpen(false);
        }
      } else {
        const { status } = await axios.post(`${categoryUrl}/create`, formdata, {
          headers: { "Content-Type": "application/json" },
        });
        if (status === 201) {
          toast.success("Category data added successfull !");
          setCategorydata((prev) => {
            return [...prev, formdata];
          });
          setOpen(false);
        }
      }
    } catch (error) {
      console.error("Failed to save category data", error);
      const { data, status } = error?.response;
      if (status === 500) {
        toast.error(data?.message);
      }
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
    <div className="w-full p-8 min-w-[300px] md:min-w-[800px]">
      <h1 className="text-2xl font-semibold mb-4"> Category</h1>
      <div className="flex justify-between">
        <h3 className="text-lg ">Manage Category</h3>
        <button
          type="button"
          className="bg-dark-purple text-white font-bold py-4 px-2 rounded"
          onClick={() => {
            setFormData(category);
            setOpen(true);
          }}
        >
          Add Category
        </button>
      </div>
      {/* <button
        type="button"
        className="bg-yellow-300 text-black font-bold py-4 px-2 rounded cursor-not-allowed"
        disabled
      >
        Refresh
      </button> */}
      <div className="py-4 w-full">
        {error ? (
          <span className="text-sm font-light p-2 mx-auto inline-block">
            Data not available at the moment.
          </span>
        ) : (
          <Table
            data={categoryData}
            onEdit={onEdit}
            onDelete={onDelete}
            from="Category"
          />
        )}
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
                  key={formdata["Department Name"]}
                  defaultValue={
                    formdata["Department Name"] || "Select Department"
                  }
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
