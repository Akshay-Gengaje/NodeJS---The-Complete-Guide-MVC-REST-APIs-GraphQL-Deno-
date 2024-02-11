const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart || { items: [] }; // items : {}
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
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
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(
      (cartProduct) => cartProduct.productId
    );
    return db
      .collection("products")
      .find({ _id: { $in: [...productIds] } })
      .toArray()
      .then((products) => {
        return products.map((product) => ({
          ...product,
          quantity: this.cart.items.find(
            (i) => i.productId.toString() === product._id.toString()
          ).quantity,
        }));
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = [
      ...this.cart.items.filter(
        (product) => product.productId.toString() !== productId.toString()
      ),
    ];

    const db = getDb();
    return db
      .collection("users")
      .updateMany(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      )
      .then((updatedCartItems) =>
        console.log("Updated Cart Items : ", updatedCartItems)
      );
  }

  static findById(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
