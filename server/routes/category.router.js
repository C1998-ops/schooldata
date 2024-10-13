const express = require("express");
const {
  addCategory,
  deleteCategory,
  fetchCategories,
  currentDepartments,
} = require("../Controller/Category");
const {
  getCategoriesByDepartment,
} = require("../Controller/SubCategory.controller");
const router = express.Router();
router.get("/get/categories", fetchCategories);
router.post("/create", addCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/current/departments", currentDepartments);
module.exports = router;
