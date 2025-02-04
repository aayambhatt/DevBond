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
app.patch("/user/:userID", async (req,res)=>{
  const userID = req.params?.userID;
  const data = req.body;

  try{
      const ALLOWED_UPDATES = [
      "photoUrl", "about", "gender", "age", "about", "photoUrl", "skills"
    ]

    //Validation for skills
    if(data?.skills.length>10){
      throw new Error("Max of 10 skills can be added");
    }

    const isUpdateAllowed = Object.keys(data).every((k)=>{
      return ALLOWED_UPDATES.includes(k);
    });

    if(!isUpdateAllowed){
      throw new Error("Update not allowed");
    }

        await User.findByIdAndUpdate({_id:userID}, data, {
          new: true,
          runValidators: true,
        });
        res.send("User updated successfully")
  }
  catch(err){
    res.status(400).send("Update Failed "  +  err.message)
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



