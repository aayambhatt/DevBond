const express = require("express");
const app = express();


app.get("/getuserdata", (req,res)=> {
  try{
    throw new Error("Data not allowed");
    res.send("User data is displayed");
  }
  catch(err){
    res.status(500).send("Please contact support team");
  }
  
})



app.listen(2626, () => {
  console.log("Server is successful on port 2626");
});
