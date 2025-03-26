'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 1337;

// Tworzymy serwer
const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, 'public', filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Not Found');
        } else {
            const ext = path.extname(filePath);
            let contentType = 'text/html';

            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'text/javascript';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(port, () => {
    console.log(`Serwer dzia³a na http://localhost:${port}`);
});