const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// middleware activated for all the routes
app.use(express.json());

app.post("/signup", async (req,res)=>{
 // creating a new instance of the User model
 const user = new User(req.body)

try{
  await user.save();
    res.send("User added successfully");
}
catch(err){
  res.status(401).send("User cannot be added");
}

})



connectDB()
.then(()=>{
console.log("DB connection is successfull");
app.listen(2626, () => {
  console.log("Server is successful on port 2626");
});
})
.catch((err)=>{
console.error("DB cannot be connected");
})



