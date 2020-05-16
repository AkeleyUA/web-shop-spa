const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessLevel: { type: Number, required: true },
  сonfirm: { type: Boolean, required: true }
})

module.exports = model('User', schema)