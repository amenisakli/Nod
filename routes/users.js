const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/users.js')

router.get('/api/auth/signup', usersControllers.signup)
//router.post('/api/auth/login', usersControllers.login)
 
module.exports = router