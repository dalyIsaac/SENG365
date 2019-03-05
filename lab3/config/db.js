const mysql = require("mysql");

let state = {
  pool: null
};

exports.connect = done => {
  state.pool = mysql.createPool({
    host: "mysql3.csse.canterbury.ac.nz",
    user: "idd17",
    password: "85231671",
    database: "idd17"
  });
  done();
};

exports.get_pool = () => state.pool;
