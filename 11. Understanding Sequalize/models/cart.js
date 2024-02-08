const { Sequelize } = require("sequelize");
const sequalize = require("../util/database");

const Cart = sequalize.define("Cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = Cart;
