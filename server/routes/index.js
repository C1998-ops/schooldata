const express = require("express");
const router = express.Router();
const deptRouter = require("./department.router");
const categoryRouter = require("./category.router");
const subCategoryRouter = require("./subCategory.router");
const scoreCardRouter = require("./scoreCard.router");
//to check functioning of API
router.get("/", (req, response) => {
  // Setting up Headers
  response.setHeader("Content-Type", "text/html");
  response.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  response.setHeader("X-Foo", "bar");

  // Calling response.writeHead method
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  // Getting the set Headers
  const headers = response.getHeaders();

  // Printing those headers
  console.log(headers);

  // browser in response
  response.end("ok");
});

router.use("/api", deptRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);
router.use("/score", scoreCardRouter);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});
module.exports = router;
