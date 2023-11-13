import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  name: String,
  price: Number,
  duration: Number, 
  features: [String], 
  maxInterests: {
    type: Number,
    default: 10, 
  },
  maxShortlist: {
    type: Number,
    default: 5, 
  },
  recommendations: {
    basedOnQualifications: Boolean,
    basedOnLocation: Boolean,
    basedOnJob: Boolean,
    basedOnHobbies: Boolean,
  },
  
});

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default SubscriptionModel;
