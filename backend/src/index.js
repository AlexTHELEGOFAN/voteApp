const Express = require("express");

const setupDatabase = require("./setup-database");

const setupMiddleware = require("./setup/middleware");

// Create a new Express instance
const app = Express();

setupMiddleware(app);

setupDatabase(
  connection.query("SELECT * FROM ma_table", function (error, results, fields) {
    if (error) throw error;
    console.log("Résultats : ", results);
  })
);

// Listen to port 4000 and display this message if running
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
