const mongoose = require('mongoose')
const User = require("./User")

mongoose.connect("mongodb://localhost/testdb")

new User({ name: "Kyle", age: 26})
