const express = require("express");
const router = express.Router();
const {
  currentAvailabelDepartments,
  getCategoriesByDepartment,
  addSubCategory,
  getSubCategoryData,
  retrieveIndividualRecord,
  deleteRecord,
  updateSubCategory,
} = require("../Controller/SubCategory.controller");
router.get("/get/data", getSubCategoryData);
router.get("/departments", currentAvailabelDepartments);
router.post("/create", addSubCategory);
router.get("/get/category", getCategoriesByDepartment);
router.get("/edit/:id", retrieveIndividualRecord);
router.delete("/delete/:id", deleteRecord);
router.put("/update/:id", updateSubCategory);

module.exports = router;
