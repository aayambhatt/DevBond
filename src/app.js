const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req,res)=>{

  // creating a new instance of the User model
  const user = new User({
    firstName: "Ruru",
    lastName: "Sen",
    emailID: "RuruSen@gmail.com",
    password: "Ruru@1234"
});

try{
await user.save();
res.send("User added successfully");
} catch(err){
  res.status(400).send("Error saving the error")
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



