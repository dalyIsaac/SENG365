const express = require("express");
const bodyParser = require("body-parser");

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());
  require("../app/routes/user.server.routes.js")(app);
  return app;
};
