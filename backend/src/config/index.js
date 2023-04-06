const mysql2 = require("mysql2");
console.log("La base données est connectée !");

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vote",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
