const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
	if(req.url === '/favicon.ico') return res.end()
	const date = new Date()
	const time = date.getTime()
	const log = `${time}: new request received on ${req.url}\n`;
	const myurl = url.parse(req.url,true)
	console.log(myurl)
	fs.appendFile('./log.txt', log, (err, data) => {
			switch (myurl.pathname) {
				case '/': res.end("Hello from home page")
					break;

				case '/about': res.end("Welcome to about page")
					break;

				case "/contact": res.end("welcome to contact page")
					break;
				default:
					break;
			}
	})
})

server.listen(8000, () => console.log("Server started at http://localhost:8000"))
