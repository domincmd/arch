const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync') // ✅ Corrected import

const adapter = new FileSync('users.json')
const db = low(adapter)

// Initialize default structure if not exists
db.defaults({ users: [] }).write()


const app = express()
const PORT = 5000

// MIDDLEWARE
app.use("/static", express.static(path.join(__dirname, "static")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET REQUESTS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html"))
})

// POST REQUESTS
app.post("/signup", (req, res) => {
    const { email, password, cpassword } = req.body

    // Optional: Simple validation
    if (!email || !password || password !== cpassword) {
        return res.status(400).send("Invalid input")
    }

    
    console.log(db.data.users) //get it here

    // Save to db
    db.get('users')
      .push({ email, password }) // Don't store passwords like this in real apps
      .write()

    res.send("User signed up successfully!")
})

// OTHER FILES' REQUESTS (already handled by static middleware, but this is okay too)
app.get("/static/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/styles.css"))
})

app.listen(PORT, () => {
    console.log("Listening at port: " + PORT)
})
