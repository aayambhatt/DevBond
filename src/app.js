// Importing the express module
const express = require("express");

// Creating an instance of the express application
const app = express();

//handle incoming requests and send a response
app.use( "/", (req,res)=>{
    res.send("Hello from the server, nodemon");
})

app.listen(2626, ()=>{
    console.log("Server is succeful on port 2626");
});