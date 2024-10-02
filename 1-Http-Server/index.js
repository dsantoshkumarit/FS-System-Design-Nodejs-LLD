const http = require('http');
const url = require('url');
const { responseHandler } = require('./utils/responseHandler');
const port = 4000;
const host = "localhost";
const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query; // req.query equivalent
    const pathname = parsedUrl.pathname; // For extracting params

    if(req.method === 'GET' && req.url==="/textData" ) {
        responseHandler(req, res, {'Content-Type' : 'text/plain'}, 200, "Your text data is : Hello World!");
    }
    else if(req.method === 'GET' && req.url==="/jsonData" ) {
        const jsonData = {
            message: "Hello World",
            date: new Date(),
        };
        responseHandler(req, res, {'Content-Type' : 'application/json'}, 200,  JSON.stringify(jsonData));
    }
    else if(req.method === 'GET' && req.url.startsWith("/userData/") ) {
        // Example: http://localhost:4000/userData/2/?test=test
        const userId = pathname.split('/')[2];
        const userData = {
            message: `Hello user_${userId}`,
            date: query,
        };
        responseHandler(req, res, {'Content-Type' : 'application/json'},  200, JSON.stringify(userData));
    }
    else{
        responseHandler(req, res, {'Content-Type' : 'text/plain'}, 200, 'Invalid URL: Please enter a valid URL.');
    }
});

server.listen(port, host, ()=>console.log(`Server Listening on http://${host}:${port}`));