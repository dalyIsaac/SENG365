const express = require("express");
const bodyParser = require("body-parser");

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  require("../app/routes/user.server.routes.js")(app);
  return app;
};
