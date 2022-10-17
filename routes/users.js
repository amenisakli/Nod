const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const usersControllers = require('../controllers/users.js')

router.post('/api/auth/signup', auth, usersControllers.signup)
router.get('/api/auth/login', auth, usersControllers.login)
 
module.exports = router