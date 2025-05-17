const mongoose = require('mongoose')

new userSchema = mongoose.Schema({
    name: String,
    age: Number,
})

module.exports = mongoose.model("User", userSchema)