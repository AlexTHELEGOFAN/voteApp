const mysql = require("mysql2");

module.exports = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mot-de-passe",
    database: "ma_base_de_donnees",
  });

  return connection.connect();
};
