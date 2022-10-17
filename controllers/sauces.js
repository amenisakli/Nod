const Sauce = require('../models/sauces')
//const jwt = require('jsonwebtoken')

exports.creation = (req, res, next) => {
    console.log(req.body)
   const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 }

/* exports.creation = async (req, res) => {
    const {name ,manufacturer ,description ,mainPepper ,imageUrl ,heat} = req.body
    const likes = dislikes = 0
    const usersLiked = usersDisliked = []
    const sauce = new Sauce({name ,manufacturer ,description ,mainPepper ,imageUrl ,heat ,likes ,dislikes ,usersLiked ,usersDisliked})
    try{
        await sauce.save()
        return res.status(200).json({message : `ajouté !`})
    }
    catch(e){
        return res.status(400).json({e})
    }
} */

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