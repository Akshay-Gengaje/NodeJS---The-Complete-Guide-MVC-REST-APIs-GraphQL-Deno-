const path = require("path");
const express = require("express");
const router = express.Router();
const rootPath = require("../utils/path");
router.get("/add-product", function (req, res) {
  res.sendFile(path.join(rootPath,  "views", "add-product.html"));
  console.log(rootPath);
});

router.post("/products", (req, res, next) => {
  console.log(req.body.title);
  res.send(`<h1>${req.body.title}</h1>`).redirect("/");
});

module.exports = router;
