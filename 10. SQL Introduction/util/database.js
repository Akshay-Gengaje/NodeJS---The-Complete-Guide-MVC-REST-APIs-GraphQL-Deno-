const { createPool } = require("mysql2");

const pool = createPool({
  //   connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "node_complete",
});

module.exports = pool.promise();
