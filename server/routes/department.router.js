const express = require("express");
const router = express.Router();
const {
  AddDepartment,
  updateDepartments,
  getDepartments,
  deleteDepartments,
  getSubCategoryCount,
} = require("../Controller/Department");
router.post("/add/department", AddDepartment);
router.get("/get/departments", getDepartments);
router.put("/update/department/:id", updateDepartments);
router.delete("/delete/department/:id", deleteDepartments);
router.get("/get/results", getSubCategoryCount);
module.exports = router;
