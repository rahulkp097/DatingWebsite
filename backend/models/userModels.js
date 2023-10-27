import mongoose from "mongoose";


const userSchema=mongoose.Schema({
   name:{
    type:String,
    
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   age:Number,
   bio:String,
   image:String,
   location:String,
   gender:String,
   matches:[],
   interestSend:[],
   interestReceived:[],
   tikets:[],
   isActive:{
      type:Boolean,
      default:true
   },
   createdAt:Date,

})



const userModel=mongoose.model("user",userSchema);

export default userModel