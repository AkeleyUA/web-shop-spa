const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true},
  category: { type: String, required: true },
  model: {type: String, required: true},
  amount: {type: Number, required: true},
  img: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true}
})

module.exports = model('Product', schema)