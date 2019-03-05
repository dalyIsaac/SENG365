const User = require("../models/user.server.model");

exports.list = (req, res) => {
  return User.getAll(result => {
    res.json(result);
  });
};

exports.create = (req, res) => {
  let user_data = {
    username: req.body.username
  };

  let user = user_data["username"].toString(0);

  let values = [[user]];

  User.insert(values, result => {
    res.json(result);
  });
};

exports.read = (req, res) => {
  let id = req.params.userId;
  User.getOne(id, result => {
    res.json(result);
  });
};

exports.update = (req, res) => {
  return null;
};

exports.delete = (req, res) => {
  return null;
};

exports.userById = (req, res) => {
  return null;
};
