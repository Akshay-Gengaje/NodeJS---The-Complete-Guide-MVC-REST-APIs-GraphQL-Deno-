const { Sequelize } = require("sequelize");

const sequalize = new Sequelize("node_complete", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequalize;
