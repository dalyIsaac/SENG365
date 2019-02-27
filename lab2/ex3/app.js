// @ts-check

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const CONNECTION_ERROR = "Error connecting to the database.";
const CONNECTION_ERROR_RESPONSE = { ERROR: CONNECTION_ERROR };

const connect = () =>
  mysql.createConnection({
    host: "mysql3.csse.canterbury.ac.nz",
    user: "idd17",
    password: "85231671",
    database: "idd17"
  });

app.get("/user", (req, res) => {
  const con = connect();
  con.connect(err => {
    if (!err) {
      console.log("Connected to the database.");
      con.query("SELECT * FROM lab2_users", (queryErr, rows, fields) => {
        con.end();
        if (!queryErr) {
          res.send(JSON.stringify(rows));
        } else {
          console.log(queryErr);
          res.send({ ERROR: "Error getting users." });
        }
      });
    } else {
      console.log(CONNECTION_ERROR);
      res.send(CONNECTION_ERROR_RESPONSE);
    }
  });
});

app.get("/user/:id", (req, res) => {
  const con = connect();
  con.connect(err => {
    if (!err) {
      const { id } = req.params;
      console.log("Connected to the database.");
      con.query(
        `SELECT * FROM lab2_users WHERE user_id = ${id}`,
        (queryErr, rows, fields) => {
          con.end();
          if (!queryErr) {
            res.send(JSON.stringify(rows));
          } else {
            console.log(queryErr);
            res.send({ ERROR: `Error getting user ${id}` });
          }
        }
      );
    } else {
      console.log(CONNECTION_ERROR);
      res.send(CONNECTION_ERROR_RESPONSE);
    }
  });
});

app.post("/user", (req, res) => {
  const user_data = { username: req.body.username };
  const con = connect();
  con.connect(err => {
    if (!err) {
      console.log("Connected to the database.");
      const user = user_data["username"].toString();
      const sql = "INSERT INTO lab2_users (username) VALUES ?";

      const values = [[user]];

      con.query(sql, [values], (queryErr, result) => {
        con.end();
        if (!queryErr) {
          res.send({ SUCCESS: "Succesfully inserted user." });
        } else {
          console.log(queryErr);
          res.send({ ERROR: "Error inserting user." });
        }
      });
    } else {
      console.log(CONNECTION_ERROR);
      res.send(CONNECTION_ERROR_RESPONSE);
    }
  });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const con = connect();
  con.connect(err => {
    if (!err) {
      console.log("Connected to the database.");
      const sql = `UPDATE lab2_users SET username="${username}" WHERE user_id=${id}`;

      con.query(sql, [], (queryErr, result) => {
        con.end();
        if (!queryErr) {
          res.send({ SUCCESS: "Successfully updated user." });
        } else {
          console.log(queryErr);
          res.send({ ERROR: "Error updating user." });
        }
      });
    } else {
      console.log(CONNECTION_ERROR);
      res.send(CONNECTION_ERROR_RESPONSE);
    }
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const con = connect();
  con.connect(err => {
    if (!err) {
      console.log("Connected to the database.");
      const sql = `DELETE FROM lab2_users WHERE user_id=${id}`;
      con.query(sql, [], (queryErr, result) => {
        con.end();
        if (!queryErr) {
          res.send({ SUCCESS: "Successfully deleted the user." });
        } else {
          console.log(queryErr);
          res.send({ ERROR: "Error deleting user." });
        }
      });
    } else {
      console.log(CONNECTION_ERROR);
      res.send(CONNECTION_ERROR_RESPONSE);
    }
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000.");
});
