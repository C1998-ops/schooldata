import React, { useCallback, useEffect, useState } from "react";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import handleErrors from "../../Components/utils/ErrorHandler";
import { departmetUrl } from "../../Components/utils/routes";
import { useToast } from "../../hooks/useToast";
import { useFetch } from "../../hooks/useFetch";

function Department() {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const departmentInfo = {
    "Department Name": "",
    "Short Name": "",
    "Is Active": false,
    startTime: "",
    endTime: "",
  };

  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [formdata, setFormData] = useState(departmentInfo);
  const [errors, setErrors] = useState({});

  const {
    data: fetchedData,
    error,
    loading,
  } = useFetch(`${departmetUrl}/get/departments`);

  useEffect(() => {
    if (fetchedData) {
      setTableData(fetchedData);
    }
  }, [fetchedData]);

  const onClose = useCallback(() => {
    setOpen(false);
    setEditData(null);
  }, []);

  useEffect(() => {
    setEditData(null);
  }, [onClose]);

  const onEdit = (id) => {
    setEditData(id);
    setOpen(true);
    setFormData(tableData.find((data) => data["sl.no"] === id));
  };

  const onDelete = async (rowId) => {
    try {
      const { data, status } = await axios.delete(
        `${departmetUrl}/delete/department/${rowId}`
      );
      if (status === 200 && data.data !== null) {
        toast.error(data?.message);
        setTableData((curr) => curr.filter((_, i) => _["sl.no"] !== rowId));
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error?.response;
        console.error("Error:", error.response.data);
        if (status === 404) {
          toast.error(data?.message);
        } else if (status === 500) {
          toast.error(data?.message);
        }
      } else if (error.request) {
        toast.error("No response received");
      } else {
        console.error("error deleting department", error);
        toast.error("error deleting department");
      }
    }
  };

  async function AddDepartment(event) {
    event.preventDefault();
    try {
      if (editData !== null) {
        const { data } = await axios.put(
          `${departmetUrl}/update/department/${editData}`,
          formdata,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (data) {
          toast.success(data?.message);
          setTableData((prevData) =>
            prevData.map((value) =>
              value["sl.no"] === editData ? { ...value, ...formdata } : value
            )
          );
        }
      } else {
        const errors = handleErrors(formdata);
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }
        const { data } = await axios.post(
          `${departmetUrl}/add/department`,
          formdata,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (data !== null) {
          toast.success(data?.message);
          setTableData((prevData) => [...prevData, formdata]);
        }
      }
    } catch (error) {
      console.log(error);
      const { data, status } = error?.response;
      console.error("Failed to save department", error);
      if (status === 500) {
        toast.error(data?.message);
      }
    } finally {
      setOpen(false);
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
    <div className="p-4 box-content w-full">
      <h2 className="text-2xl font-semibold text-gray-700"> Departments</h2>
      <div className="sm:min-w-[450px] lg:min-w-[600px]  ">
        <div className="flex justify-between">
          <h3 className="text-lg">Manage Departments</h3>

          <button
            type="button"
            className="bg-dark-purple text-white font-bold py-4 px-2 rounded"
            onClick={handleAdddeptClick}
          >
            Add Department
          </button>
        </div>
      </div>
      <div className="py-4 max-w-fit md:max-w-screen-lg overflow-hidden">
        <Table
          data={tableData}
          onEdit={onEdit}
          onDelete={onDelete}
          from={"Department"}
          loader={loading}
        />
      </div>
      <Modal isOpen={open} onClose={onClose}>
        <div className="bg-white md:max-w-full w-full">
          <h2 className="font-bold text-2xl">Add Department</h2>
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
                    {errors["Is Active"]}
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
                  onChange={handleChange}
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
        {/* {formSubmitted && (
          <div className="bg-white p-4 mx-auto flex flex-col min-w-full space-y-4">
            <span className="text-xl font-semibold text-gray-800 items-center">
              Department Added Successfully
            </span>
            <div className="w-full float-right">
              <button
                className="bg-gray-400 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )} */}
      </Modal>
    </div>
  );
}

export default Department;
