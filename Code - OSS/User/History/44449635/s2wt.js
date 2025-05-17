const { MongoClient } = require("mongodb");


async function setupDatabase() {
    console.log("Attempting to connect...");

    const uri = "mongodb://localhost:27017"; // Replace with your actual MongoDB URI
    const client = new MongoClient(uri);


    await client.connect()
    const database = client.db("testdb")
    const collection = database.collection("users")

    await collection.createIndex({username: 1}, {unique: true})
    await collection.createIndex({email: 1}, {unique: true})
}

async function addUser(username, email, password) {
    const uri = "mongodb://localhost:27017"; // Replace with your actual MongoDB URI
    const client = new MongoClient(uri);

    await client.connect()
    const database = client.db("testdb")
    const collection = database.collection("users")

    try {
        collection.insertOne({username: username, email: email, password: password})
        console.log("Successfully inserted user: " + `{username: ${username}, email: ${email}, password: ${password}}`)
        return {ok: true, error: null}        
    } catch (e) {
        console.log(e)
        return {ok: false, error: e}
    }
    
}

async function verifyUser(username, email, password) {
    const uri = "mongodb://localhost:27017"; // Replace with your actual MongoDB URI
    const client = new MongoClient(uri);

    await client.connect()
    const database = client.db("testdb")
    const collection = database.collection("users")

    //console.log([ username, email, password ]) //USE ONLY FOR DEBUGGING

    try {
        const result = collection.find({ username: username, email: email, password: password });  
        console.log("Found user: " + result);  // Log the result correctly
        return { ok: true, user: result, error: null}
    } catch (e) {
        console.log(e)
        return { ok: false, user: null, error: e}
    }
    
}

//setupDatabase() //ONLY CALL IF STANDALONE RUNNING

module.exports = {setupDatabase, addUser, verifyUser}
