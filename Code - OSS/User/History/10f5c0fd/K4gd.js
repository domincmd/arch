const express = require('express')
const fs = require('fs')
const bodyParser = require("body-parser");
const {setupDatabase, addUser, verifyUser} = require("./database")
const path = require('path');
const { verify } = require('crypto');

const app = express()
const PORT = 5000;

// SETUP DATABASE

setupDatabase()

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
    const result = addUser(username, email, password)
    if (result.ok == true) {
        res.send("You have successfully created your account. You can now login.")
    }else{
        res.send("Error: " + result.error)
    }
})

app.post('/login', (req, res) => {
    const {username, email, password} = req.body;
    console.log("Recieved data:", {username, email, password})
    const result = await verifyUser(username, email, password)

    console.log(result) //this says that this is a promise. How can I fix it

    if (result.ok == true) {
        res.sendFile(path.join(__dirname, "html/dashboard.html"))
    }else{
        res.send("Error: " + result.error)
    }
})



app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})