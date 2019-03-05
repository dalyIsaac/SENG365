const db = require("../../config/db");

exports.getAll = done => {
  db.get_pool().query("SELECT * FROM lab2_users", (err, rows) => {
    if (err) {
      return done({ ERROR: "Error selecting" });
    }
    return done(rows);
  });
};

exports.getOne = (userId, done) => {
  db.get_pool().query(
    "SELECT * FROM lab2_users WHERE user_id = ?",
    userId,
    (err, rows) => {
      if (err) {
        return done(err);
      }
      done(rows);
    }
  );
};

exports.insert = (username, done) => {
  let values = [username];

  db.get_pool().query(
    "INSERT INTO lab2_users (username) VALUES ?",
    values,
    (err, result) => {
      if (err) {
        return done(err);
      }
      done(result);
    }
  );
};

exports.alter = () => {
  return null;
};

exports.remove = () => {
  return null;
};
