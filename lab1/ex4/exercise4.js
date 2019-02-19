const http = require("http");
const url = require("url");

http.createServer((request, response) => {
    const basket = ["milk", "bread", "eggs", "flour"];
    const params = new URL(request.url, "https://localhost").searchParams.toString();
    const urlParams = new URLSearchParams(params);
    const itemNum = Number(urlParams.get("itemNum"));

    response.writeHead(200, {
        "Content-Type": "text/plain",
    });

    response.end(`Item at item_num ${itemNum}: ${basket[itemNum]}`);
}).listen(8081);

console.log("Server running at localhost:8081");
