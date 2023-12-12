const mongoose = require('mongoose')

// For simplicity sake passwords are hardcoded
// as purpose of this project is solely graphQL education
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  }
})

module.exports = mongoose.model('User', schema)