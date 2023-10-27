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
  location: String,
  gender: String,
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
  tikets: [],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: Date,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
