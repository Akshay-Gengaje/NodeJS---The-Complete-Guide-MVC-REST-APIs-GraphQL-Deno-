const path = require("path");
const rootPath = require("./utils/path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { routes } = require("./routes/admin.route");
const shopRoutes = require("./routes/shop.route");
app.set("view engine", "pug");
app.set("view", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", routes);

app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res, next) => {
  res.send("<h1>Welcome to the backend!</h1>");
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootPath, "views", "404.html"));
});
app.listen(3000);
