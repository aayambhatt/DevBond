const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation"); 
const User = require("../models/user");
const bcrypt  = require("bcrypt");
const validator = require("validator");





// posting user, signup
authRouter.post("/signup", async (req,res)=>{
    try{ // Validation of data
    validateSignUpData(req);
  
    const { firstName, lastName, emailID, password} = req.body;
  
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)
  
  
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
authRouter.post("/login", async (req,res)=>{
    try{
      const {emailID, password} = req.body;
  
      // Find the user in the database
      const user = await User.findOne({emailID: emailID});
      if(!user){
        throw new Error("Invalid credentials");
      }
      
      // Validate the email format
      if(!validator.isEmail(emailID)){
        throw new Error("Email is not valid");
      }
  
      // Compare the entered password with the hashed password in DB
      const isPasswordValid = await user.validatePassword(password);
      
      if(isPasswordValid){
        // Generate a JWT token containing the user's ID
        const token = await user.getJWT();
  
        // Store the token in a cookie
        res.cookie("token", token);
  
        res.send("User login successful");
      }
      else{
        throw new Error("Password is not correct");
      }
    }
    catch(err){
      res.status(401).send(`ERROR: ${err.message}`);
    }
  });

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
  });




module.exports = authRouter;