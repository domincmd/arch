const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/html/index.html"))
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})