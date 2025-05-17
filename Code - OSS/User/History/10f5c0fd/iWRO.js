const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/html/loginsignup.html"))
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})