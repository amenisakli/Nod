const User = require('../models/users')
const bcrypt = require('bcrypt')
exports.signup = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message : `bad request`})
    }
    try{
        const hash = await bcrypt.hash(password, 8)
       
           const user = new User({email,password:hash})
       
           await user.save()
           return res.status(200).json({message : `bienvenue`})
    }
    catch(e){
        return res.status(500).json({e})
    }
}/*
exports.login = (req, res) => {
    res.status(200).json('login')
    .then(res.status(200).json('login'))
}*/