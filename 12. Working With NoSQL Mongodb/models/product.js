const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id && new ObjectId(id);
    this.userId = userId;
  }
  save() {
    const db = getDb();
    console.log("ID", this._id);
    let dbOp;
    // if id is given then we will update the product
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // dbOp = db.collection("products").insertOne({
      //   title: this.title,
      //   price: this.price,
      //   imageUrl: this.imageUrl,
      //   description: this.description,
      // });
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => console.log("Save result : ", result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static fetchById(id) {
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new ObjectId(id) })
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
      .then((result) => console.log("DELETED"))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
