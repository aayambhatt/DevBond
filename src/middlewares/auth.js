const adminAuth = (req,res,next)=>{
    const token = "xyz";
   const isAuthorized = token === "xyz";
 
   if(!isAuthorized){
     res.status(401).send("Data not allowed")
   }
   else{
     next();
   }
 
  
 }


 const userAuth = (req,res,next)=>{
    const token = "xyz";
   const isAuthorized = token === "xyz";
 
   if(!isAuthorized){
     res.status(401).send("Data not allowed")
   }
   else{
     next();
   }
 
  
 }

 module.exports = { adminAuth, userAuth }