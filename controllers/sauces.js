const Sauce = require('../models/sauces')

exports.creation = (req, res, next) => {
   const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 }

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

exports.modification = async (req, res) => {
    const sauces = await Sauce.findOne({ _id: req.params.id })
    if(!sauces){
        return res.status(404).json({message : `not found`})
    }
    if(req.auth.userId !== sauces.userId){
        return res.status(403).json({message : `pas le droit`})
    }
    let upadtedSauce = {}
    if(!req.file){
        upadtedSauce = req.body
    }
    else{
        upadtedSauce = JSON.parse(req.body.sauce)
        upadtedSauce.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Object.assign(sauces, upadtedSauce)
    await sauces.save()
    return res.status(201).json({message: 'Objet modifié !'})
}

exports.suppression = async (req, res) => {
    const sauces = await Sauce.findOne({ _id: req.params.id })
    if(!sauces){
        return res.status(404).json({message : `not found`})
    }
    if(req.auth.userId !== sauces.userId){
        return res.status(403).json({message : `pas le droit`})
    }
    try{
        await Sauce.deleteOne({_id: req.params.id})
        return res.status(200).json({message : `supprimé `})
    }
    catch(e){
        return res.status(500).json({message : `bad request`})
    }
}

exports.like = async (req, res) => {
    const like = req.body.like
    if(like === 1){
        await Sauce.updateOne({_id: req.params.id}, {$inc : {likes : 1}, $push : {usersLiked : req.body.userId}, _id  : req.params.id} )
        res.status(200).json({message : `ajouté`})
    }
    else if(like === -1){
        await Sauce.updateOne({_id: req.params.id}, {$inc : {dislikes : 1}, $push : {usersDisliked : req.body.userId}, _id  : req.params.id} )
        res.status(200).json({message : `ajouté`})
    }
    else{
        const sauce = await Sauce.findOne({ _id: req.params.id })
        if(sauce.usersLiked.indexOf(req.body.userId) !== -1){
            await Sauce.updateOne({_id: req.params.id}, {$inc : {likes : -1}, $pull : {usersLiked : req.body.userId}, _id  : req.params.id} )
        res.status(200).json({message : `supprimé`})
        }
        if(sauce.usersDisliked.indexOf(req.body.userId) !== -1){
            await Sauce.updateOne({_id: req.params.id}, {$inc : {dislikes : -1}, $pull : {usersDisliked : req.body.userId}, _id  : req.params.id} )
        res.status(200).json({message : `supprimé`})
        }
    }
}