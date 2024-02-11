const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (cb) => {
  console.log("Connecting to MongoDB");
  MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      _db = client.db("shop");
      console.log("Connected to MongoDB");
      cb(client);
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to MongoDB");
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
