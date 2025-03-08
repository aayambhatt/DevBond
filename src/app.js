const express = require("express");
const connectDB = require("./config/database");
const validator = require('validator');
const cookieParser = require("cookie-parser");

const app = express();

// middleware activated for all the routes
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth"); 
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);




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



