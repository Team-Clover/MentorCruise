import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// loginuser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User does not exist" });
    }

    const passwrd = await bcrypt.compare(password, user.password);

    if (passwrd) {
      const token = createToken(user._id);
      res
        .status(200)
        .json({ success: true, message: "User logged in successfully", token });
    } else {
      res.status(200).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in registering user", error });
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists" });
    }
  } 
  catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in registering user", error });
  }
};

export { loginUser, registerUser, adminLogin, getProfile };
