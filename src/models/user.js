const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
        minLength: 4,

    },
    lastName: {
        type: String
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


module.exports =  mongoose.model("User", userSchema);

