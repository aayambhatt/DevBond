const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

// /profile API
profileRouter.get("/profile", userAuth, async (req,res)=>{
    try{
    
    const user = req.user;
    
    res.send(user);
  
    }
    catch(err){
      res.status(400).send("ERRO:" + err.message);
    }
  })

module.exports = profileRouter;