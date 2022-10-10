const http = require ('http')
const express = require('express');

const app = express();

app.set('port',process.env.PORT || 3000);
const server = http.createServer(app)

server.listen(process.env.PORT || 3000)

module.exports = app