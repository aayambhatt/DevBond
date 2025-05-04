const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
        index: true,
        minLength: 4,

    },
    lastName: {
        type: String,
        index: true,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }

    },
    password: {
        type: String,
        required: true,

    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.geographyandyou.com/images/user-profile.png",
        
    },
    about: {
        type: String,
        default: "This is a default description of the user", 
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
   }
);  

// compound index 
userSchema.index({firstName: 1, lastName: 1});

userSchema.methods.getJWT = async function (){
    // we'll have our user as this
    const user = this; 


    const token = await jwt.sign({_id: user._id}, "DEVBOND@123");

    return token;

};

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;



}


module.exports =  mongoose.model("User", userSchema);

