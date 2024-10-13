const asyncHandler = require("express-async-handler");
const Model = require("../Models/Department.model");
const CategoryModel = require("../Models/Category.model");
const SubCategoryModel = require("../Models/SubCategory.model");
const AddDepartment = asyncHandler(async (req, res) => {
  console.log("body", req.body);
  const departmentData = {
    departmentName: req.body["Department Name"],
    shortName: req.body["Short Name"],
    isActive: req.body["Is Active"],
    startTime: req.body?.startTime,
    endTime: req.body?.endTime,
  };
  const data = new Model(departmentData);
  try {
    await data.save();
    res.status(201).json({ message: "Department added successfull !" });
  } catch (error) {
    console.error("Failed saving department data", error);
    res.status(400).json({ message: error.message });
  }
});
const getDepartments = asyncHandler(async (req, res) => {
  try {
    const data = await Model.find();
    const prepareddata = data.map((department, index) => ({
      "sl.no": department._id,
      "Department Name": department.departmentName,
      "Short Name": department.shortName,
      "Category Name": department.categoryName,
      "Is Active": department.isActive,
      startTime: department.startTime,
      endTime: department.endTime,
    }));

    res.status(200).json({
      message: "departments fetched successfully",
      data: prepareddata,
    });
  } catch (error) {
    console.error(error, "error retrieving department data");
    res.status(500).json({
      message: "Failed to retrieve department data",
      error: error.message,
    });
  }
});
const updateDepartments = asyncHandler(async (req, res) => {
  const rowId = req.params.id;
  const departmentData = {
    departmentName: req.body["Department Name"],
    shortName: req.body["Short Name"],
    isActive: req.body["Is Active"],
    startTime: req.body?.startTime,
    endTime: req.body?.endTime,
  };
  try {
    const result = await Model.findByIdAndUpdate(
      rowId,
      { $set: departmentData },
      { new: true, runValidators: true }
    );
    if (result) {
      res.status(200).json({
        message: "Department updated successfully !",
        updated: result,
      });
    } else {
      return res.status(404).json({ message: "Department not found !" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update department", error: error.message });
  }
});
const deleteDepartments = asyncHandler(async (req, res) => {
  try {
    const rowId = req.params.id;
    console.log(rowId);
    const newData = await Model.findByIdAndDelete(rowId);
    if (newData !== null) {
      res.status(200).json({
        message: "Department deleted successfully !",
        data: newData,
      });
    } else {
      return res.status(404).json({ message: "Department not deleted !" });
    }
  } catch (error) {
    console.error("Failed to update department", error);

    res
      .status(500)
      .json({ message: "Failed to update department", error: error.message });
  }
});
const getSubCategoryCount = asyncHandler(async (req, res) => {
  try {
    // Fetch the count of documents from each collection
    const departmentCount = await Model.countDocuments();
    const countActive = await Model.countDocuments({ isActive: true });

    const categoryCount = await CategoryModel.countDocuments();
    const categoryActive = await CategoryModel.countDocuments({
      isActive: true,
    });

    const subCategoryCount = await SubCategoryModel.countDocuments();
    const subCategoryActive = await SubCategoryModel.countDocuments({
      isActive: true,
    });
    const results = {
      Departments: {
        total: departmentCount,
        totalActive: countActive,
      },
      Categories: {
        total: categoryCount,
        totalActive: categoryActive,
      },
      "Sub Categories": {
        total: subCategoryCount,
        totalActive: subCategoryActive,
      },
    };
    // Send the response with the total counts
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching dashboard results:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve dashboard data" });
  }
});

module.exports = {
  AddDepartment,
  getDepartments,
  updateDepartments,
  deleteDepartments,
  getSubCategoryCount,
};
