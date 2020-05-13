const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true},
  category: { type: String, required: true },
  amount: {type: Number, required: true},
  img: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  show: {type: Boolean},
  sale: {type: Number}
})

module.exports = model('Product', schema)