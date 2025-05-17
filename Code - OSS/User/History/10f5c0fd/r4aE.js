const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'static')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html/loginsignup.html"))
})

app.get("/static/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "static/styles.css"))
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})