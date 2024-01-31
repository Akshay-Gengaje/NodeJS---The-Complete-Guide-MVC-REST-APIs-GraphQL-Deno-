const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Fetch previous products
    fs.readFile(p, (error, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (error) {
        console.log(error);
      } else {
        cart = JSON.parse(data);
      }

      //Analyze the cart => Find existing products
      const existingProductsIndex = cart.products.findIndex(
        (products) => products.id === id
      );
      const existingProducts = cart.products[existingProductsIndex];
      let updatedProducts;
      //Add new products / increase quantity
      if (existingProducts) {
        updatedProducts = { ...existingProducts };
        updatedProducts.qty = updatedProducts.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductsIndex] = updatedProducts;
      } else {
        updatedProducts = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProducts];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
