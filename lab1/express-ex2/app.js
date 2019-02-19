// @ts-check

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("HTTP request: GET /");
})

app.post("/", (req, res) => {
    res.send("HTTP request: POST /");
});

app.put("/", (req, res) => {
    res.send("HTTP request: PUT /");
});

app.delete("/", (req, res) => {
    res.send("HTTP request: DELETE /");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
