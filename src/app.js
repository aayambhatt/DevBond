const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation"); 
const bcrypt  = require("bcrypt");
const validator = require('validator');


const app = express();

// middleware activated for all the routes
app.use(express.json());

// posting user, signup
app.post("/signup", async (req,res)=>{
  try{ // Validation of data
  validateSignUpData(req);

  const { firstName, lastName, emailID, password} = req.body;

  // Encrypt the password
  const passwordHash = await bcrypt.hash(password, 10)
  console.log(passwordHash);

 // creating a new instance of the User model
 const user = new User({
  firstName,
  lastName, 
  emailID, 
  password: passwordHash,
});

await user.save();
    res.send("User added successfully");
}
catch(err){
  res.status(401).send(`ERROR: ${err.message}`);
}

});


// login API
app.post("/login", async (req,res)=>{
  try{
    const {emailID, password} = req.body;

    const user = await User.findOne({emailID: emailID});
    if(!user){
      throw new Error("Invalid credentials");
    }
    
    if(!validator.isEmail(emailID)){
      throw new Error("Email is not valid");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      res.send("User login successfull");
    }
    else{
      throw new Error("Password is not correct");
    }

  }
  catch(err){
    res.status(401).send(`ERROR: ${err.message}`);
  }
  

})

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



