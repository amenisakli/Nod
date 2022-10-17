const Sauce = require('../models/sauces')
//const jwt = require('jsonwebtoken')

exports.affichageSauces = async (req, res) => {
    const sauces = await Sauce.find()
    if(!sauces){
        return res.status(500).json({message : `bad request`})
    }
    try{
        return res.status(200).json(sauces)
    }
    catch(e){
        return res.status(400).json({e})
    }
}
exports.affichageSauce = async (req, res) => {
    const sauces = await Sauce.findOne({ _id: req.params.id })
    if(!sauces){
        return res.status(404).json({message : `bad request`})
    }
    try{
        return res.status(200).json(sauces)
    }
    catch(e){
        return res.status(400).json({e})
    }
}