const mongoose = require("mongoose");


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  }
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
trim:true,
validate:[validateEmail,'Invalid Email Format']
},

photoUrl:{
type:String,
default:"https://tse2.mm.bing.net/th?id=OIP.7cRYFyLoDEDh4sRtM73vvwHaDg&pid=Api&P=0&h=180"
}
,
password:{
    type:String,
required:true,
minLength:[5,'password minimum length be 5'],
maxLength:[10,'password cannot be greater than 10'],

},
age:{
    type:Number,
},
about:{
    type:String,
default:"this is the about page"
},
skills:{
type:[String],

},
gender:{
    type:String,
}
},
//here we can also used the timestamps to get the created and updated date time of schema
{timestamps:true})

module.exports = mongoose.model("User",userSchema);