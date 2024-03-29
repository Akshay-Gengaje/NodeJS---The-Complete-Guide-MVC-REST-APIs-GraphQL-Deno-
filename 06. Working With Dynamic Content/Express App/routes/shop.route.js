const path = require("path");
const express = require("express");
const router = express.Router();
const rootPath = require("../utils/path");
const { products } = require("./admin.route");
router.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootPath, "views", "shop.html"));
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
}); 

module.exports = router;
