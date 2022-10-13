const bodyParser = require('body-parser');
const http = require ('http')
const express = require('express')
const saucesRoutes = require('./routes/sauces.js')
const usersRoutes = require('./routes/users.js')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.set('port',process.env.PORT || 3000)
const server = http.createServer(app)

app.use('/', saucesRoutes)
app.use('/', usersRoutes)

server.listen(process.env.PORT || 3000)

module.exports = app