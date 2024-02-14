const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

UserSchema.methods.addToCart = function (product) {
  const cartProductsIndex = this.cart?.items?.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductsIndex >= 0) {
    newQuantity = this.cart.items[cartProductsIndex].quantity + 1;
    updatedCartItems[cartProductsIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

UserSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = model("User", UserSchema);
