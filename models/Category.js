const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true},
  show: { type: Boolean }
})

module.exports = model('Category', schema)