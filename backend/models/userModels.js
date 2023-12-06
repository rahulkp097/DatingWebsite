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
  currentLocation: String,
  gender: String,
  education: String,
  occupation: String,
  hobbies: [],
  subscription: {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    planName: String,
    status: Boolean,
    expirationDate: Date,
    startDate: Date,
  },

  photos: {
    type: [String],
  },

  interestCount: {
    type: Number,
    default: 0,
  },
  shortlistCount: {
    type: Number,
    default: 0,
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
  reports: [
    {
      reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      reason: String,
      createdAt: Date,
    },
  ],
  reportCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: Date,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
