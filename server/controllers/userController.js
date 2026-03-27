import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


// loginuser
const loginUser = async function(req,res){
  const {email,password} = req.body;
  try{
    const userExist = await userModel.findOne({email});
    if(!userExist){
      res.status(200).json({success:false,message:"User does not exist"});
    }
    const isPasswordCorrect = await userExist.comparerPassword(password);
    if(!isPasswordCorrect){
      res.status(200).json({success:false,message:"Incorrect password"});
    }
    const token = userExist.generateAuthToken();
    res.status(200).json({success:true,message:"Login Successful",token});
  }catch(error){{
    res.status(500).json({success:false,message:"Error in login",error});
  }
}
}
// register user
const registerUser = async (req, res) => {
  const {email,password,name,username,role} = req.body;
  try{
    const userExist = await userModel.findOne({email});
    if(userExist){
      res.status(200).json({success:false,message:"User already exists"});
    }
    const hashedpassword = await hashPassword(password);
    const generateToken = userModel.generateAuthToken();

    userModel.create({
      email: email,
      password: hashedpassword,
      name,
      username,
      role
    })
  }catch(error){
    res.status(500).json({success: false, message: "Error in registering user", error});
  }
}

export { loginUser, registerUser };
