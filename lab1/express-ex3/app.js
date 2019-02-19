// @ts-check

const express = require("express");
const bodyParser = require("body-parser");
const data = require("./users.json");

const users = data.users;
const app = express();

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let res_data = "No user";

    for (let user of users) {
        if (id === user.id) {
            res_data = user;
            break;
        }
    }
    res.send(res_data);
});

// Tell the express app to expect json in the body of the requi=est

app.use(bodyParser.json());

app.post("/users/:id", (req, res) => {
    let id = req.params.id;
    let user_data = req.body;

    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            users[uid] = user_data;
            break;
        }
    }
    res.send(user_data);
});

app.delete("/users/:id", (req, res) => {
    let id = req.params.id;

    for (let user of users) {
        if (id === user.id) {
            let uid = users.indexOf(user);
            // remove 1 item at index "uid"
            users.splice(uid, 1);
        }
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
