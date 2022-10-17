const mongoose = require('mongoose')
const mongooseError = require('mongoose-errors')

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true},
  description: { type: String, required: true},
  mainPepper: { type: String, required: true},
  imageUrl: { type: String},
  heat: { type: Number, required: true},
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: [{ type: String}],
  usersDisliked: [{ type: String}],
});

sauceSchema.plugin(mongooseError)

module.exports = mongoose.model('Sauce', sauceSchema)