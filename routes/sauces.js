const express = require('express')
const router = express.Router()
const saucesControllers = require('../controllers/sauces')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/api/sauces', auth, multer, saucesControllers.creation)
router.get('/api/sauces', saucesControllers.affichageSauces)
router.get('/api/sauces/:id', saucesControllers.affichageSauce)
 
module.exports = router