const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'static')));

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
    
})




app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})