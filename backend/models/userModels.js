import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  bio: String,
  image: String,
  country: String, 
  state: String,   
  city: String,    
  gender: String,
  education:String,
  occupation:String,
  hobbies:[],
  subscription: {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    status:Boolean, 
    expirationDate: Date, // Date when the subscription expires
  },

  shortlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  interestSend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  interestReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  tikets: [  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: Date,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
