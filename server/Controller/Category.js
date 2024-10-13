const asyncHandler = require("express-async-handler");
const departmentModel = require("../Models/Department.model");
const Model = require("../Models/Category.model");
const addCategory = asyncHandler(async (req, res) => {
  console.log(req.body);
  const categoryData = {
    departmentName: req.body["Department Name"],
    categoryName: req.body["Category Name"],
    shortName: req.body["Short Name"],
    isActive: req.body["Is Active"],
    imageUrl: req.body["image Url"],
  };
  const data = new Model(categoryData);
  try {
    await data
      .save()
      .then((data) => console.log("data", data))
      .catch((err) => {
        return err;
      });
    return res.status(201).json({ message: "Category added successfull !" });
  } catch (error) {
    console.error("Failed saving category data", error);
    res.status(400).json({ message: error.message });
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const rowId = req.params.id;
    console.log(rowId);
    const newData = await Model.findByIdAndDelete(rowId);
    if (newData !== null) {
      res.status(200).json({
        message: "Category deleted successfully !",
        data: newData,
      });
    } else {
      return res.status(404).json({ message: "Category not deleted !" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update Category", error: error.message });
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
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unknown error occured at server side", err });
  }
});
const fetchCategories = asyncHandler(async (req, res) => {
  const result = await Model.find();
  if (result.length > 0) {
    const transformedData = result.map((data, index) => ({
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
  }
});
module.exports = {
  addCategory,
  deleteCategory,
  fetchCategories,
  currentDepartments,
};
