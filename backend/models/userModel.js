const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = require('../utils/envData');


const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type : String , required: true},
    image: {type: String, required : true},
    password :{type: String , required:true},
    highScore :{type: Number ,default : 0},
    refreshToken :{type: String },
},
    {
        suppressReservedKeysWarning: true
    },
{
    timestamps: true,
});


userSchema.pre("save" , async function(next){
if(!this.isModified("password")){
   next();
}

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password , salt);

});


userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword ,this.password);
}

userSchema.methods.generateToken = async function(){
    try{
        return await jwt.sign(
           
           { _id: this._id,
            email: this.email,
           },
           JWT_ACCESS_TOKEN,
           {
            expiresIn : "10m"
           },
        );
    }catch(err)
    {
        console.error(err);
    }

};


userSchema.methods.generateRefreshToken = async function(){
    try{
        return await jwt.sign(
           
           { _id: this._id,
            email: this.email,
           },
           JWT_REFRESH_TOKEN,
           {
            expiresIn : "20d",
           },
        );
    }catch(err)
    {
        console.error(err);

    }

};


const User = mongoose.model("User" , userSchema);


module.exports = User;