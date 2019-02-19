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

app.get("/users/:id/follow/:target", (req, res) => {
    let { id, target } = req.params;

    // Note: not very efficient
    users.forEach(user => {
        if (id === user.id) {
            user.following.push(target);
            res.send(user);
        }
    });
});

app.get("/users/:id/unfollow/:target", (req, res) => {
    let { id, target } = req.params;

    // Note: not very efficient
    users.forEach(user => {
        if (id === user.id) {
            user.following = user.following.reduce((acc, curr) => {
                if (curr !== target) {
                    acc.push(curr);
                }
                return acc;
            }, []);
            res.send(user);
        }
    });
});

app.get("/users/:id/following", (req, res) => {
    let { id } = req.params;

    for (const user of users) {
        if (user.id === id) {
            res.send(user.following);
        }
        return;
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
