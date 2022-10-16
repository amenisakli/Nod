const mongoose = require('mongoose')
const validator  = require('mongoose-unique-validator')
const mongooseError = require('mongoose-errors')

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.plugin(validator)
userSchema.plugin(mongooseError)

module.exports = mongoose.model('User', userSchema)