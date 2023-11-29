import userModel from "../models/userModels.js";
import SubscriptionModel from "../models/subscriptionModels.js";
import dotenv from "dotenv";
import { generateAdminToken } from "../utils/generateToken.js";
import UserActivityModel from "../models/userActivityModels.js";
dotenv.config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.AdminUsername &&
      password === process.env.AdminPassword
    ) {
      generateAdminToken(res, email);

      res.status(200).json({ success: true, message: "login sucesss" });
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ message: "server Issue" });
  }
};

const getUserData = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "server issue" });
  }
};

const userAction = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await userModel.findById(userId);

    if (user) {
      const updatedIsActive = !user.isActive; // Toggle the isActive status
      user.isActive = updatedIsActive;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        isActive: updatedIsActive,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const adminLogout = (req, res) => {
  // Clear the 'jwt' cookie
  res.clearCookie("adminjwt");

  res.status(200).json({ message: "logout successfully" });
};

const getSubscripctions = async (req, res, next) => {
  try {
    const subscriptionList = await SubscriptionModel.find();

    res.status(200).json({ subscriptionList });
  } catch (error) {
    next(error);
  }
};

const mapRecommendationsToBoolean = (receivedRecommendations) => {
  const recommendations = {
    basedOnQualifications: false,
    basedOnLocation: false,
    basedOnJob: false,
    basedOnHobbies: false,
  };

  receivedRecommendations.forEach((recommendation) => {
    const key = `basedOn${recommendation}`;
    if (recommendations.hasOwnProperty(key)) {
      recommendations[key] = true;
    }
  });

  return recommendations;
};

const addSubcripction = async (req, res, next) => {
  try {
    const { recommendations = [], ...otherSubscriptionDetails } = req.body;

    const newSubscription = {
      recommendations: {
        basedOnQualifications: recommendations.includes("Qualifications"),
        basedOnLocation: recommendations.includes("Location"),
        basedOnJob: recommendations.includes("Job"),
        basedOnHobbies: recommendations.includes("Hobbies"),
      },
      ...otherSubscriptionDetails,
    };
 

    const createdSubscription = await SubscriptionModel.create(newSubscription);
    res
      .status(201)
      .json({
        success: true,
        createdSubscription,
        message: "New Subscription plan added",
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const UpdateSubscripctionPlan = async (req, res, next) => {
  try {
    const { recommendations = [], ...updatedSubscriptionPlan } = req.body;

    const updatedRecommendations = {
      basedOnQualifications: recommendations.includes("Qualifications"),
      basedOnLocation: recommendations.includes("Location"),
      basedOnJob: recommendations.includes("Job"),
      basedOnHobbies: recommendations.includes("Hobbies"),
    };

    const updatedPlan = await SubscriptionModel.findByIdAndUpdate(
      req.body._id,
      { recommendations: updatedRecommendations, ...updatedSubscriptionPlan },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Subscription Plan Updated",
        updatedPlan,
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const DeleteSubscripctionPlan = async (req, res, next) => {
  try {
    const PlanId = req.params.id;

    const subscriptionList = await SubscriptionModel.findOneAndDelete({
      _id: PlanId,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Subscripction Plan Deleted Successfully",
        subscriptionList,
      });
  } catch (error) {
    next(error);
  }
};

const getUserActivity = async (req, res, next) => {
  try {
    const userId = req.params.Id;

    const userActivity = await UserActivityModel.find({
      userId: userId,
    }).populate("userId");

    res.status(200).json({ success: true, userActivity });
 
  } catch (error) {
    next(error);
  }
};

const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    // Get all unique plan names from the SubscriptionModel
    const planNames = await SubscriptionModel.distinct("name");

    // Dynamically construct the counts for each plan
    const planCounts = await Promise.all(
      planNames.map(async (planName) => ({
        [planName]: await userModel.countDocuments({
          "subscription.planName": planName,
        }),
      }))
    );

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const usersPerTime = await userModel.aggregate([
      {
        $facet: {
          monthly: [
            {
              $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 },
              },
            },
          ],
          weekly: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%U",
                    date: "$createdAt",
                  },
                },
                count: { $sum: 1 },
              },
            },
          ],
          yearly: [
            {
              $match: {
                createdAt: { $gte: new Date(currentYear, 0, 1) }, // Start of the current year
              },
            },
            {
              $group: {
                _id: { $year: "$createdAt" },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);


    const usersWithActiveSubscriptions = await userModel.find({
      'subscription.status': true,
    });
    
    // Create a map to store monthly revenue data
    const monthlyRevenueData = new Map();
    
    // Calculate revenue for each user and aggregate by month
    for (const user of usersWithActiveSubscriptions) {
      const { subscription } = user;
    
      // Retrieve subscription details
      const subscriptionDetails = await SubscriptionModel.findById(subscription.plan);
    
      if (subscriptionDetails) {
        // Calculate revenue for each user
        const { price } = subscriptionDetails;
        const startMonth = user.subscription.startDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
    
        // Add revenue to the corresponding month in the map
        const currentRevenue = monthlyRevenueData.get(startMonth) || 0;
        monthlyRevenueData.set(startMonth, currentRevenue + price);
      }
    }
    
    const monthlyRevenueArray = Array.from(monthlyRevenueData.entries()).map(([month, revenue]) => ({ month, revenue }));

   
    

    res.status(200).json({
      success: true,
      totalUsers,
      monthlyRevenueData: monthlyRevenueArray,
      planCounts,
      usersPerMonth: usersPerTime[0]?.monthly || [],
      usersPerWeek: usersPerTime[0]?.weekly || [],
      usersPerYear: usersPerTime[0]?.yearly || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export {
  adminLogin,
  getUserData,
  adminLogout,
  userAction,
  getSubscripctions,
  addSubcripction,
  UpdateSubscripctionPlan,
  DeleteSubscripctionPlan,
  getUserActivity,
  getDashboardData,
};
