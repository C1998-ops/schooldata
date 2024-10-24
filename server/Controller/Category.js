const asyncHandler = require("express-async-handler");
const departmentModel = require("../Models/Department.model");
const Model = require("../Models/Category.model");
const addCategory = asyncHandler(async (req, res) => {
  try {
    const categoryData = {
      departmentName: req.body["Department Name"],
      categoryName: req.body["Category Name"],
      shortName: req.body["Short Name"],
      isActive: req.body["Is Active"] || false,
      imageUrl: req.body["image Url"] || "",
    };
    const data = new Model(categoryData);
    const result = await data.save();
    if (result) {
      return res
        .status(201)
        .json({ message: "Category data added successfully !" });
    } else {
      throw new Error("Failed to save category data");
    }
  } catch (error) {
    console.error("Failed saving category data", error.message);
    res.status(500).json({
      message: "An internal server error occurred. Please try again later",
      error: error.message,
    });
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const rowId = req.params.id;
    const newData = await Model.findByIdAndDelete(rowId);
    if (newData == null) {
      return res.status(404).json({ message: "Failed to delete category !" });
    }
    res.status(200).json({
      message: "Category deleted successfully !",
      data: newData,
    });
  } catch (error) {
    console.error("error deleting category data", error);
    res.status(500).json({
      message: "An internal server error occurred. Please try again later",
    });
  }
});

const currentDepartments = asyncHandler(async (req, res) => {
  try {
    const stages = [
      {
        $group: {
          _id: "$departmentName", // Group by department_id to ensure uniqueness
          departmentId: { $first: "$_id" }, // Take the first departmentName for each department_id
        },
      },
      {
        $project: {
          _id: 0, // Do not include the default _id field
          "Department Name": "$_id", // Project the department name
          department_id: "$departmentId", // Project the unique department_id
        },
      },
    ];
    const uniqueDepartments = await departmentModel.aggregate(stages);
    if (uniqueDepartments.length > 0) {
      res
        .status(200)
        .json({ message: "Availabel departments", data: uniqueDepartments });
    }
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "Unknown error occured at server side", error });
  }
});
const fetchCategories = asyncHandler(async (req, res) => {
  try {
    const result = await Model.find();
    if (!result) {
      return res
        .status(204)
        .json({ message: "No categories found.", data: null });
    }
    const transformedData = result.map((data) => ({
      "sl.no": data._id,
      "Department Name": data.departmentName,
      "Category Name": data.categoryName,
      "Short Name": data.shortName,
      "Is Active": data.isActive,
      "image Url": data.imageUrl,
    }));
    res.status(200).json({
      message: "Categories fetched successfully !",
      data: transformedData,
    });
  } catch (error) {
    console.error("error fetching category data", error);
    return res.status(500).json({
      message: "An internal server error occurred. Please try again later",
    });
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const rowId = req.params.id;
  const categoryInfo = {
    departmentName: req.body["Department Name"],
    categoryName: req.body["Category Name"],
    shortName: req.body["Short Name"],
    isActive: req.body["Is Active"] || false,
    imageUrl: req.body["image Url"] || "",
  };
  try {
    const result = await Model.findByIdAndUpdate(
      rowId,
      { $set: categoryInfo },
      { new: true, runValidators: true }
    );
    if (result) {
      res.status(200).json({
        message: "Category data updated successfully !",
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
module.exports = {
  addCategory,
  deleteCategory,
  fetchCategories,
  currentDepartments,
  updateCategory,
};
