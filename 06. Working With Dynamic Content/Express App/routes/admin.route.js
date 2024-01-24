const path = require("path");
const express = require("express");
const router = express.Router();
const rootPath = require("../utils/path");

const products = [];
router.get("/add-product", function (req, res) {
  // res.sendFile(path.join(rootPath, "views", "add-product.html"));
  res.render("add-product");
});

router.post("/add-product", function (req, res) {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
