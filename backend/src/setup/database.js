const mysql = require("mysql2");

module.exports = () => {
  const connection = mysql.createConnection({
    host: "localhost:3306",
    user: "root",
    password: "",
    database: "ma_base_de_donnees",
  });

  return connection.connect();
};
