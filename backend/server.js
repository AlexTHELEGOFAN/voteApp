// Database
const db = require("./src/config");

// Express
const express = require("express");
const app = express();

// Cors
// const cors = require("cors");

// app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

// app.listen(5000, () => {
//   console.log("Server listening on port 5000!");
// });

app.get("/api/votes", async (req, res) => {
  console.log("Api vote");
  try {
    const conn = await db.getConnection();

    try {
      // Begin transaction
      await conn.beginTransaction();

      // Get the vote counts from the database
      const [result] = await conn.query(
        "SELECT vote, SUM(vote = 'yes') AS yes_count, SUM(vote = 'no') AS no_count FROM votes GROUP BY vote"
      );

      // Commit transaction
      await conn.commit();

      // Send the vote counts to the client
      res.json({ votes: result });
    } catch (err) {
      // Rollback transaction on error
      await conn.rollback();
      console.error(
        "Error retrieving vote counts from MySQL database: " + err.stack
      );
      res.status(500).send("Error retrieving vote counts from MySQL database");
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    res.status(500).send("Error connecting to MySQL database");
  }
});

app.get('/hello', function(req, res) {
  res.send('Hello World!');
});


app.post("/api/votes", async (req, res) => {
  const { vote } = req.body;

  try {
    const conn = await db.getConnection();

    try {
      // Begin transaction
      await conn.beginTransaction();

      // Increment vote count in the database for the selected option
      const [result] = await conn.execute(
        "INSERT INTO votes (vote) VALUES (?)",
        [vote]
      );

      // Get the updated vote count from the database
      const [[yesVotes], [noVotes]] = await conn.query(
        "SELECT count FROM vote_count WHERE option IN ('yes', 'no')"
      );

      // Commit transaction
      await conn.commit();

      // Send the updated vote count to the client
      res.json({ yes: yesVotes.count, no: noVotes.count });
    } catch (err) {
      // Rollback transaction on error
      await conn.rollback();
      console.error(
        "Error updating vote count in MySQL database: " + err.stack
      );
      res.status(500).send("Error updating vote count in MySQL database");
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    res.status(500).send("Error connecting to MySQL database");
  }
});
