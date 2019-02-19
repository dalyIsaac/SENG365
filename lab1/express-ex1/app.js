// @ts-check

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
})

app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
})
