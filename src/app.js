// Importing the express module
const express = require("express");

// Creating an instance of the express application
const app = express();

//this will only handle GET call to /user
app.get("/user", (req,res)=>{
    res.send({firstName:"Aayam", lastName: "Bhatt"});
})

app.post("/user", (req,res)=>{
    //saving data to DB
    res.send("Data successfully saved");
})

app.delete("/user", (req,res)=>{
    res.send("Deleted successfully");

})

// handle incoming requests and send a response
// this will match all the http method api calls to /test
app.use("/test", (req,res)=>{
        res.send("This is /test");

})


app.listen(2626, ()=>{
    console.log("Server is succeful on port 2626");
});