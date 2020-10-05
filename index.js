const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
	console.log('Someone accessed the server.');
	
	//Parse pathname property from URL
	const pathName = url.parse(req.url, true).pathname;
	//Parse query obj.id from URL
	const id = url.parse(req.url, true).query.id;
	
	if (pathName === '/products' || pathName === '/') {
		//Write header signifying response ok
		res.writeHead(200, {'Content-type': 'text/html'});
		//Send actual response (comes after header)
		res.end('This is the products url response page.');
	}
	
	else if (pathName === '/laptop' && id < laptopData.length) {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(`This is the laptop url response page for latop ${id}`);
	}
	
	else {
		res.writeHead(404, {'Content-type': 'text/html'});
		res.end('URL not found. :(');
	}
	
});

server.listen(1337, '127.0.0.1', () => {
	console.log('Server listening...');
});
