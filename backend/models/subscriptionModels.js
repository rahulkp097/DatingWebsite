const subscriptionSchema = mongoose.Schema({
    name: String,
    price: Number,
    duration: Number, // Duration in months
    features: [String], // List of features included in the plan
  });
  
  const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);
  
  export default SubscriptionModel;
  