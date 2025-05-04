const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName, lastName, emailID, password } = req.body;
     
    if(!firstName || !lastName){
        throw new Error("Please enter name");
    }

    else if(!validator.isEmail(emailID)){
        throw new Error("Email is not valid");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a new password");
    }
    
}

const validateEditProfileData  = (req)=>{
    const allowedEditFields = ["firstName", "lastName", "emailID", "gender", "age", "about", "skills"];

   const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

   return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
};