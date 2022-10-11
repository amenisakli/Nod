const express = require('express')
const router = express.Router()
const saucesControllers = require('../controllers/sauces')

router.get('/api/sauces', saucesControllers.creation)
 
module.exports = router