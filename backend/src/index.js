// Database
const connection = require("./config/index");

// Express
const express = require("express");
const app = express();

// Cors
// const cors = require("cors");

// app.use(cors());
app.use(express.json());

function endConnection(connection) {
  connection.end(function (err) {
    if (err) throw err;
    console.log("Connection closed!");
  });
}

app.listen(5000, () => {
  console.log("Server listening on port 5000!");
});

app.get("/api/votes", async (req, res) => {
  try {
    // Connect to the database
    connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    // Get the vote counts from the database
    connection.query(
      "SELECT SUM(vote = 'yes') AS yes_count, SUM(vote = 'no') AS no_count FROM votes",
      function (err, result) {
        if (err) {
          console.error(
            "Error retrieving vote counts from MySQL database: " + err.stack
          );
          res
            .status(500)
            .send("Error retrieving vote counts from MySQL database");
          return;
        }

        // Send the vote counts to the client
        res.json({ votes: result });
      }
    );
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    res.status(500).send("Error connecting to MySQL database");
    return;
  }
});

app.post("/api/votes", async (req, res) => {
  const { vote } = req.body;

  try {
    // Connect to the database
    connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    const dateVote = new Date().toISOString();

    const sql = "INSERT INTO votes (vote, dateVote) VALUES (?, ?)";
    const values = [vote, dateVote];

    await connection.execute(sql, values);

    connection.query(
      "SELECT SUM(vote = 'yes') AS yes_count, SUM(vote = 'no') AS no_count FROM votes",
      function (err, result) {
        if (err) {
          console.error(
            "Error retrieving vote counts from MySQL database: " + err.stack
          );
          res
            .status(500)
            .send("Error retrieving vote counts from MySQL database");
          return;
        }

        // Send the vote counts to the client
        res.json({ votes: result });
      }
    );
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    res.status(500).send("Error connecting to MySQL database");
    return;
  }
});

app.delete("/api/votes", async (req, res) => {
  try {
    // Connect to the database
    connection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    connection.query("TRUNCATE TABLE votes", function (err) {
      if (err) {
        console.error(
          "Error retrieving vote counts from MySQL database: " + err.stack
        );
        res
          .status(500)
          .send("Error retrieving vote counts from MySQL database");
        return;
      }
    });
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    res.status(500).send("Error connecting to MySQL database");
    return;
  }
});
