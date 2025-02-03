const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// middleware activated for all the routes
app.use(express.json());

// posting user, signup
app.post("/signup", async (req,res)=>{
 // creating a new instance of the User model
 const user = new User(req.body)

try{
  await user.save();
    res.send("User added successfully");
}
catch(err){
  res.status(401).send(`User cannot be added. Error: ${err.message}`);
}

});

//get user by email
app.get("/user", async (req,res)=>{
  const userEmail = req.body.emailID;

  try{
   const users = await User.find({emailID: userEmail})
   res.send(users);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }

})

// Feed API -  /feed - gets all the users from the database
app.get("/feed", async (req,res) => {

  try{
    const users = await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }


})

//Delete a user from the database
app.delete("/user", async (req,res)=>{
  const userID = req.body.userID;
  
  try{
    const users = await User.findByIdAndDelete({_id:userID});
    res.send("User deleted successfully");
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }

})

//update data of the user
app.patch("/user", async (req,res)=>{
  const userID = req.body.userID
  const data = req.body;

  try{
        await User.findByIdAndUpdate({_id:userID}, data);
        res.send("User updated successfully")
  }
  catch(err){
    res.status(400).send("Something went wrong")
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



