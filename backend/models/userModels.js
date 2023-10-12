import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=mongoose.Schema({
   name:{
    type:String,
    required:true
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
   matches:[],
   interest:[],
   tikets:[],
   isActive:Boolean
})
// userSchema.pre("save", async function (next) {
//    try {
//      if (this.isModified("password")) {
//        const salt = await bcrypt.genSalt(10);
//        this.password = await bcrypt.hash(this.password, salt);
//      }
//      next();
//    } catch (error) {
//      next(error);
//    }
//  });

//  userSchema.methods.matchPasswords=async function(enteredPassword){
//    return await bcrypt.compare(enteredPassword,this.password)
//  }

const userModel=mongoose.model("user",userSchema);

export default userModel