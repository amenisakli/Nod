const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message : `bad request`})
    }
    try{
        const hash = await bcrypt.hash(password, 8)
       
           const user = new User({email,password:hash})
       
           await user.save()
           return res.status(200).json({message : `enregistré`})
    }
    catch(e){
        return res.status(500).json({e})
    }
}

exports.login = async (req, res) => {
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return res.status(400).json({message : `bad request`})
    }
    try{
        const MDP = await bcrypt.compare(req.body.password, user.password)
        if(!MDP){
            return res.status(401).json({message : `error authentification`})
        }
        else{
            return res.status(200).json({
                userId : user._id,
                token : jwt.sign(
                    {userId : user._id},
                    'PROJET_6_OPENCLASSROOM',
                    {expiresIn : '24h'}
                )
            })
        }
    }
    catch(e){
        return res.status(500).json({e})
    }
}