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

// Tell the express app to expect json in the body of the request

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
    let outputData = "User could not be found";

    users.forEach(user => {
        if (id === user.id) {
            user.following.push(target);
            outputData = user;
        }
    });
    res.send(outputData);
});

app.get("/users/:id/unfollow/:target", (req, res) => {
    let { id, target } = req.params;
    let outputData = "User could not be found";

    // Note: not very efficient
    users.forEach(user => {
        if (id === user.id) {
            user.following = user.following.reduce((acc, curr) => {
                if (curr !== target) {
                    acc.push(curr);
                }
                return acc;
            }, []);
            outputData = user;
        }
    });
    res.send(outputData);
});

app.get("/users/:id/following", (req, res) => {
    let { id } = req.params;
    let outputData = "User could not be found";

    for (const user of users) {
        if (user.id === id) {
            outputData = user.following;
        }
    }
    res.send(outputData);
});

app.post("/users/:id/create-post", (req, res) => {
    const { id } = req.params;
    const { post } = req.body;

    const postId = Date.now();
    let outputData = "User could not be found";

    for (const user of users) {
        if (user.id === id) {
            user.posts[postId] = post;
            outputData = user;
        }
    }
    res.send(post);
});

app.get("/users/:id/posts", (req, res) => {
    const { id } = req.params;
    let outputData = "User could not be found";
    
    for (const user of users) {
        if (user.id === id) {
            outputData = user.posts;
        }
    }
    res.send(outputData);
});

app.get("/users/:id/posts/:postId", (req, res) => {
    const { id, postId } = req.params;
    let outputData = "User could not be found";

    for (const user of users) {
        if (user.id === id) {
            outputData = user.posts[postId];
        }
    }
    res.send(outputData);
});

app.post("/users/:id/posts/:postId/update", (req, res) => {
    const { id, postId } = req.params;
    const { newPost } = req.body;
    let outputData = "User could not be found";

    for (const user of users) {
        if (user.id === id) {
            user.posts[postId] = newPost;
            outputData = user;
        }
    }
    res.send(outputData);
});

app.delete("/users/:id/posts/:postId/delete", (req, res) => {
    const { id, postId } = req.params;
    let outputData = "User could not be found";

    for (const user of users) {
        if (user.id === id) {
            delete user.posts[postId];
            outputData = user;
        }
    } 
    res.send(outputData);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
