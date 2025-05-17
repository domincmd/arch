const express = require('express')
const fs = require('fs')
const bodyParser = require("body-parser");
const {setupDatabase, addUser, verifyUser} = require("./database")
const path = require('path')

const app = express()
const PORT = 5000;

// SETUP DATABASE

// MIDDLEWARE

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));

// SERVE CSS FILES

app.get("/static/styles.css", (req, res) => { // serve the style files
    res.sendFile(path.join(__dirname, "static/styles.css"))
});

// GET NORMAL HTML REQUESTS

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "html/loginsignup.html"))
})

// POST AND PROCESS LOGIN/SIGNUP ACTIVITY

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log("Received Data:", { username, email, password });
})




app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})