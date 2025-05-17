const mongoose = require('mongoose')

new userSchema = mongoose.Schema({
    name: String,
    age: Number,
})

mongoose.model("User", userSchema)