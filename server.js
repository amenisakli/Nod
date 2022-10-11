const http = require ('http')
const express = require('express')
const saucesRoutes = require('./routes/sauces.js')

const app = express()

//console.log(saucesRoutes)
app.set('port',process.env.PORT || 3000)
const server = http.createServer(app)

app.use('/', saucesRoutes)

server.listen(process.env.PORT || 3000)

module.exports = app