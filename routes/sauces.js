const express = require('express')
const router = express.Router()
const saucesControllers = require('../controllers/sauces')

router.get('/api/sauces', saucesControllers.affichageSauces)
router.get('/api/sauces/:id', saucesControllers.affichageSauce)
 
module.exports = router