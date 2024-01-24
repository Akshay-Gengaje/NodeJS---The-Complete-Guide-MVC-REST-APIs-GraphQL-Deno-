const path = require("path");
const express = require("express");
const router = express.Router();
const rootPath = require("../utils/path");
const { products } = require("./admin.route");
router.get("/", (req, res, next) => {
  console.log("shop.js", products);
  res.sendFile(path.join(rootPath, "views", "shop.html"));
});

module.exports = router;
