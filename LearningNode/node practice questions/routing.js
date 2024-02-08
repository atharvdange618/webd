const http = require('http')

function router(req, res) {
    const path = req.url;

    if (path == "/hello") {
        res.writeHead(200, { 'Content-Type': "text/plain" })
        res.end("hello world")
    }
    else if (path == "/bye") {
        res.writeHead(200, { 'Content-Type': "text/plain" })
        res.end("Goodbye, world!");
    } else {
        res.writeHead(404, { 'Content-Type': "text/plain" });
        res.end("page not found");
    }
}

const server = http.createServer(router).listen(3000, () => {
    console.log("server has started");
})