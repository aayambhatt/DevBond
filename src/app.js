const express = require("express");
const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)

app.get("/user", userAuth, (req,res)=> {
  res.send("User is authorized")
})

app.get("/admin/getalluser", (req, res) => {
    res.send("Data sent")
  });

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted user");
});

app.listen(2626, () => {
  console.log("Server is successful on port 2626");
});
