const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// send connection request
requestRouter.post("/request/send/:status/:toUserId", userAuth ,async (req,res)=> {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // if user send request to themselves 
        if(fromUserId.toString() === toUserId.toString()){
            return res.status(400).json({ message: "You cannot send a connection request to yourself" });
        }
            

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type"});
        }

        // if id exists or not 
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({
                message:"User not found"
            });
        }
        

        //if there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId:fromUserId},
            ]
           
        });
        if (existingConnectionRequest) {
            return res.status(400).json({
                message: "Connection request already exists between these users",
            });
        }
        

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,

        });

        const data = await connectionRequest.save();

        res.json({
            message:
              req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
          });
         
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
   
});


requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
      try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
  
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
          return res.status(400).json({ messaage: "Status not allowed!" });
        }
  
        const connectionRequest = await ConnectionRequest.findOne({
          _id: requestId,
          toUserId: loggedInUser._id,
          status: "interested",
        });
        if (!connectionRequest) {
          return res
            .status(404)
            .json({ message: "Connection request not found" });
        }
  
        connectionRequest.status = status;
  
        const data = await connectionRequest.save();
  
        res.json({ message: "Connection request " + status, data });
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
    }
  );

module.exports = requestRouter;
