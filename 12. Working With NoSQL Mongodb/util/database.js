const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (cb) => {
  MongoClient.connect(
    `mongodb+srv://Akshay:${encodeURIComponent(
      "Akshay@501"
    )}@cluster0.1iv2g10.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      _db = client.db("shop");
      console.log("Connected to MongoDB");
      cb(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("DB not connected");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
