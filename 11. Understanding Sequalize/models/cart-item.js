const { Sequelize } = require("sequelize");
const sequalize = require("../util/database");

const CartItem = sequalize.define("CartItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
