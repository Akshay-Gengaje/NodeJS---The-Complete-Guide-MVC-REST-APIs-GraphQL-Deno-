const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  static findById(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
