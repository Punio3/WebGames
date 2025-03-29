'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 1337;
const publicDir = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(publicDir, filePath);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Not Found');
            return;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
                return;
            }

            const ext = path.extname(filePath);
            let contentType = 'text/html';

            switch (ext) {
                case '.css': contentType = 'text/css'; break;
                case '.js': contentType = 'text/javascript'; break;
                case '.json': contentType = 'application/json'; break;
                case '.png': contentType = 'image/png'; break;
                case '.jpg': contentType = 'image/jpeg'; break;
                case '.svg': contentType = 'image/svg+xml'; break;
                default: contentType = 'text/html';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

server.listen(port, () => {
    console.log(`Serwer dzia³a na http://localhost:${port}`);
});