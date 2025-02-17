const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation"); 
const bcrypt  = require("bcrypt");
const validator = require('validator');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");


const app = express();

// middleware activated for all the routes
app.use(express.json());
app.use(cookieParser());

// posting user, signup
app.post("/signup", async (req,res)=>{
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
app.post("/login", async (req,res)=>{
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


// /profile API
app.get("/profile", userAuth, async (req,res)=>{
  try{
  
  const user = req.user;
  
  res.send(user);

  }
  catch(err){
    res.status(400).send("ERRO:" + err.message);
  }
})

// send connection request
app.post("/sendConnectionRequest", userAuth ,async (req,res)=> {
   
    console.log("Sending a connection request");

    res.send("connection request sent");

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



