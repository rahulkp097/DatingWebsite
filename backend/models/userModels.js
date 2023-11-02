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
  country: String, // Add a field for the country
  state: String,   // Add a field for the state
  city: String,    // Add a field for the city
  gender: String,

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
  tikets: [],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: Date,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
