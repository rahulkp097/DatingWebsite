import userModel from "../models/userModels.js"
import generateToken from "../utils/generateToken.js"
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await userModel.findOne({ email });
      console.log(user);
      
      if (user && user.password===password) {
          console.log("user found",user);
          generateToken(res, user._id); 
          
          res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              
          });
      } else {
          res.status(401).json({
              message: 'Invalid username or password',
          });
      }
  } catch (error) {
      res.status(500).json({
          message: 'Server error',
      });
  }
};
  
 

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userModel.findOne({ email });

  if (userExists) {
      return res.status(400).json({ message: "User already exists" });
  }

  try {
      const user = await userModel.create({ name, email, password });

      if (user) {
          generateToken(res, user._id);

          res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email
          });
      }
  } catch (error) {
      
      console.error("Error during user registration:", error);
      
      res.status(500).json({ message: "Server error" });
  }
};

const getprofile=(req,res)=>{
    
    try {
        
        let user
    } catch (error) {
        
    }
}


const userLogout=(req,res)=>{

    res.cookie('jwt',"",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({mesasge:'logout sucessfully'})
}



export {
    login,
    getprofile,
    registerUser,
    userLogout
}