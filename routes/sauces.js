const express = require('express')
const router = express.Router()
const saucesControllers = require('../controllers/sauces')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/api/sauces', auth, multer, saucesControllers.creation)
router.get('/api/sauces', saucesControllers.affichageSauces)
router.get('/api/sauces/:id', saucesControllers.affichageSauce)
router.put('/api/sauces/:id', auth, multer, saucesControllers.modification)
router.delete('/api/sauces/:id', auth, saucesControllers.suppression)
router.post('/api/sauces/:id/like', auth, saucesControllers.like)
 
module.exports = router