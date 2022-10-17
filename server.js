const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const saucesRoutes = require('./routes/sauces.js')
const usersRoutes = require('./routes/users.js')
const path = require('path')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(express.urlencoded({extented:true}))

app.use('/', saucesRoutes)
app.use('/', usersRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect('mongodb+srv://Alexandre:yWQMapVoCaKBMapE@cluster0.54sr2im.mongodb.net/',/*{useNewUrlParser:true,useUnifiedTopology:true}*/)
.then(()=> {
    console.log('connecté')
    app.listen(process.env.PORT || 3000, () => console.log(`l'application lancée`))
})


module.exports = app
