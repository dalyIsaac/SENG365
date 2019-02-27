const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "mysql3.csse.canterbury.ac.nz",
  user: "idd17",
  password: "85231671",
  database: "idd17"
});

/**
 *
 * @param {express.Response} res
 * @param {mysql.MysqlError} err
 */
function reportConnectionError(res, err) {
  console.error(err);
  res.json({ ERROR: "Could not connect to the database" });
}

app.get("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      reportConnectionError(res, err);
      return;
    }
    console.log("Connected as id " + connection.threadId);

    connection.query("SELECT * FROM lab2_users", (err, rows) => {
      connection.release();
      if (!err) {
        res.json(rows);
      }
    });

    connection.on("error", err => {
      res.json({ ERROR: "Error in connection database." });
      return;
    });
  });
});

app.post("/users", (req, res) => {
  const user_data = {
    username: req.body.username
  };
  pool.getConnection(function(err, connection) {
    if (err) {
      reportConnectionError(res, err);
      return;
    }
    console.log("connected as id " + connection.threadId);
    let user = user_data["username"].toString();
    const sql = `INSERT INTO lab2_users (username) VALUES ?`;
    console.log(user);
    let values = [[user]];
    connection.query(sql, [values], function(err, result) {
      connection.release();
      if (!err) {
        res.json({ SUCCESS: "successfully inserted user" });
      } else {
        console.log(err);
        res.json({ ERROR: "Error inserting user" });
      }
    });
    connection.on("error", function(err) {
      res.json({ ERROR: "Error in connection database" });
      return;
    });
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000.");
});
