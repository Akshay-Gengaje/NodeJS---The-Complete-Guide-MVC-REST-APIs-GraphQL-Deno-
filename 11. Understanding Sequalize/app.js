const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const db = require("./util/database");
const app = express();
const Product = require("./models/product");
const User = require("./models/user");
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequalize = require("./util/database");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
sequalize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) return User.create({ name: "John", email: "john@gmail.com" });
    return user;
  })
  .then((user) => {
    // console.log(user);
    user.createCart();
  })
  .then(() => {
    app.listen(3000);
    console.log(`app listening on 3000`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
