const CategoryModel = require("../Models/Category.model");
const SubCategoryModel = require("../Models/SubCategory.model");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
exports.addSubCategory = asyncHandler(async (req, res) => {
  try {
    const data = {
      departmentName: req.body["Department Name"],
      categoryName: req.body["Category Name"],
      subCategoryName: req.body["SubCategory Name"],
      shortName: req.body["Short Name"],
      isActive: req.body["Is Active"],
      imageUrl: req.body["image Url"],
    };
    const createRecords = new SubCategoryModel(data);
    const result = await createRecords.save();
    if (result) {
      res
        .status(201)
        .json({ message: "SubCategory data added successfully !" });
    }
  } catch (err) {
    console.error("Sub category data not saved", err);
    res
      .status(500)
      .json({ message: "Unknown error occured at server side", err });
  }
});
exports.getSubCategoryData = asyncHandler(async (req, res) => {
  try {
    const data = await SubCategoryModel.find();
    if (!data) {
      return res
        .status(204)
        .json({ message: "sub Category data not availabel !" });
    }
    const transformdata = data?.map((data) => ({
      "sl.no": data._id,
      "Department Name": data.departmentName,
      "Category Name": data.categoryName,
      "SubCategory Name": data.subCategoryName,
      "Short Name": data.shortName,
      "Is Active": data.isActive,
      "image Url": data.imageUrl,
    }));
    res.status(200).json({
      message: "Sub-Category data fetched successfully !",
      data: transformdata,
    });
  } catch (error) {
    console.error("Failed retrieving sub category data", error);
    return res.status(500).json({
      message: "An internal server error occurred. Please try again later",
    });
  }
});
exports.retrieveIndividualRecord = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SubCategoryModel.findById(id);
    if (!data) {
      return res.status(400).json({ message: "data not found." });
    }
    const transformdata = {
      "sl.no": data._id,
      "Department Name": data.departmentName,
      "Category Name": data.categoryName,
      "SubCategory Name": data.subCategoryName,
      "Short Name": data.shortName,
      "Is Active": data.isActive,
      "image Url": data.imageUrl,
    };
    return res.status(200).json({
      message: "subCategory data has been retrieved!",
      data: transformdata,
    });
  } catch (err) {
    console.error("failed to get Sub category data ", err);
    res
      .status(500)
      .json({ message: "Unknown error occured at server side", err });
  }
});
exports.currentAvailabelDepartments = asyncHandler(async (req, res) => {
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
    const uniqueDepartments = await CategoryModel.aggregate(stages);
    if (!uniqueDepartments) {
      return res
        .status(204)
        .json({ message: "Departments currently not availabel" });
    }
    return res.status(200).json({
      message: "currently availabel departments",
      data: uniqueDepartments,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unknown error occured at server side", err });
  }
});
exports.getCategoriesByDepartment = async (req, res) => {
  try {
    const { department } = req.query;
    // Fetch categories where department matches the selected department's name
    const categories = (
      await CategoryModel.find({ departmentName: department })
    ).map((data) => data.categoryName);
    if (!categories) {
      return res
        .status(404)
        .json({ message: "No categories found for this department" });
    }
    res.status(200).json({ data: categories });
  } catch (error) {
    console.error("Failed to retrieve categories for dept", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteRecord = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const result = await SubCategoryModel.findByIdAndDelete(id, {
      new: true,
    });
    if (!result) {
      return res.status(400).json({ message: `Sub Category not deleted !` });
    }
    return res.status(200).json({ message: "record has been deleted !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
exports.updateSubCategory = asyncHandler(async (req, res) => {
  try {
    console.log("body", req.body);
    const rowid = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(rowid)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const body = {
      departmentName: req.body["Department Name"],
      categoryName: req.body["Category Name"],
      subCategoryName: req.body["SubCategory Name"],
      shortName: req.body["Short Name"],
      isActive: req.body["Is Active"],
      imageUrl: req.body["image Url"],
    };
    const updateDocument = await SubCategoryModel.findByIdAndUpdate(
      rowid,
      { $set: body },
      { new: true, runValidators: true }
    );
    if (updateDocument) {
      return res.status(200).json({
        message: "Sub category has been updated!",
        data: updateDocument,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal error has been occurred",
      error: error.message,
    });
  }
});
