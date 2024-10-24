const express = require("express");
const {
  addCategory,
  deleteCategory,
  fetchCategories,
  currentDepartments,
  updateCategory,
} = require("../Controller/Category");

const router = express.Router();
router.get("/get/categories", fetchCategories);
router.post("/create", addCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/current/departments", currentDepartments);
router.put("/update/Category/:id", updateCategory);
module.exports = router;
