/*
Routing refers to the mechanism for serving the client the content it has asked for. For
web-based client/server applications, the client specifies the desired content in the URL;
specifically, the path and querystring.
*/


var http = require('http');

http.createServer((req, res) => {
    //normalise the url by removing querystring, optional
    //trailing slash, and making it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;

        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
    }

}).listen(3000);

console.log("Server started on localhost:3000");