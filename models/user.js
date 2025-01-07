const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

firstName:{
    type:String,
    required:true,
    minLength:[4,`please enter firstName greater than 3`],
    maxLength:[8,`firstName length cannot be greater then 8`],
lowercase:true
},

lastName:{
    type:String,
    required:true,
    uppercase:true
},
// we can use the lowercase to convert all uppercase letter to lowercase enter by user and trim to remove all unwanted spaces 
email:{
type:String,
required:true,
unique:true,
lowercase:true,
trim:true
}
,
password:{
    type:String,
required:true
}
})

module.exports = mongoose.model("User",userSchema);