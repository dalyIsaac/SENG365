// @ts-check

const http = require("http");
const URL = require("url").URL;

http.createServer((request, response) => {
    const params = new URL(request.url, "https://localhost").searchParams.toString()

    // write the response
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });

    response.end("Here is your data: " + params)
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
