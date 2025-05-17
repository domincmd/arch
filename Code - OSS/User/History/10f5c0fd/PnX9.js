const express = require('express')
const fs = require('fs')
const bodyParser = require("body-parser");
const {setupUserDatabase, addUser, verifyUser} = require("./database")
const {setupValidationDatabase, addUserValidation, verifyUserValidation} = require("./validation")
const path = require('path');
const { verify } = require('crypto');

const app = express()
const PORT = 5000;

// SETUP DATABASE

setupUserDatabase()
setupValidationDatabase()

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

app.post('/login', async (req, res) => {
    const {username, email, password} = req.body;
    console.log("Recieved data:", {username, email, password})
    const result = await verifyUser(username, email, password)

    //console.log(result) // ONLY USE 4 DEBUGGING

    if (result.ok == true) {
        const validationResult = await addUserValidation(username)
        fs.readFile(path.join(__dirname, "html/dashboard.html"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).send("Error loading page: " + err)
            }

            const modifiedHTML = data.replace("<!-- CODE_PLACEHOLDER -->", `<script>window.SECRET_CODE = ${validationResult.validation}</script>`)

            res.send(modifiedHTML)
        }) 
    }else{
        res.send("Error: " + result.error)
    }
})


//DATABASE REQUESTS

app.get('/api/getinfo', async (req, res) => {
    const validationCode = req.query
    
    const result = await verifyUserValidation(Number(validationCode.code))

    res.send(result)

})


app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})