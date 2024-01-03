var http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}
http.createServer(function (req, res) {
    // normalize url by removing querystring, optional
    // trailing slash, and making lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            serveStaticFile(res, '/public/Home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/About.html', 'text/html');
            break;
        case '/img/logo.jpeg':
            serveStaticFile(res, '/public/img/logo.jpeg', 'image/jpeg');
            break;
        default:
            serveStaticFile(res, '/public/NotFound.html', 'text/html', 404);
            break;
    }
}).listen(3000);

console.log('Server started on localhost: 3000; press Ctrl-C to terminate....');

//fs.readFile is an asynchronous method for reading files
/*
The function is simple: it calls fs.readFile to read the contents
of the specified file. 
fs.readFile executes the callback function when the file has been
read; if the file didn’t exist or there were permissions issues reading the file, the err
variable is set, and the function returns an HTTP status code of 500 indicating a server
error. 
If the file is read successfully, the file is sent to the client with the specified response
code and content type
 */