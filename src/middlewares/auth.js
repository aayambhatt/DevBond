const jwt = require("jsonwebtoken"); 
const User = require("../models/user.js");

 const userAuth = async (req,res,next)=>{
 try{ // read the token from the request cookies
  const {token} = req.cookies;
  if(!token){
    throw new Error("Token is not valid");
  }
  // validate the token
  const decodedObj = await jwt.verify(token, "DEVBOND@123");

  // get id 
  const {_id} = decodedObj;

  const user = await User.findById(_id);
  if(!user){
    throw new Error("User not found");
  }

  req.user = user;

  next();
}

catch(err){
  res.status(400).send("ERROR" + err.message);
}
  
  
 };

 module.exports = { userAuth };