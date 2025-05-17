const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your actual MongoDB URI
const client = new MongoClient(uri);

async function setupDatabase() {
    console.log("Attempting to connect...");

    await client.connect()
    const database = client.db("testdb")
    const collection = database.collection("users")

    await collection.createIndex({username: 1}, {unique: true})
}

async function addUser(username, email, password) {
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

async function verifyUser(username = undefined, email = undefined, password = undefined) {
    await client.connect()
    const database = client.db("testdb")
    const collection = database.collection("users")


    try {
        const result = await collection.find({ username, email, password }).toArray();  
        console.log(result);  // Log the result correctly
    } catch (e) {
        console.log(e)
    }
    
}

setupDatabase()

//addUser('johnnyy', 'john@me.com', '1234')

verifyUser('john', 'john@me.com', "1234")
