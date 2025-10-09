import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import "dotenv/config"
import uploadFromBuffer from "../utils/cloudinary.js";
import Post from "../models/post.model.js";

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    if (!token) {
        return res.json({
            success: false,
            message: "Token cannot be generated"
        });
    }

  res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,            // ensures cookie only sent over HTTPS
      sameSite: "none",        // REQUIRED for cross-site cookies (frontend+backend on different domains)
      maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password should be at least 8 characters"
            });
        }

        const isPresent = await User.findOne({ email });

        if (isPresent) {
            return res.json({
                success: false,
                message: "Email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        generateToken(user._id, res);

        return res.json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.log("Error while registering the User", error);
        return res.json({
            success: false,
            message: error.message,
            
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Email is not registered"
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.json({
                success: false,
                message: "Email or Password is incorrect"
            });
        }

        generateToken(user._id, res);

        return res.json({
            success: true,
            message: "User logged in successfully",
            user
        });

    } catch (error) {
        console.log("Error while logging in the user", error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing user id in params" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const result = await uploadFromBuffer(req.file.buffer);
    const user = await User.findByIdAndUpdate(userId, { image: result.secure_url }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: "Profile image uploaded", image: result.secure_url, user });
  } catch (error) {
    console.error("Upload profile image error", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('user') 
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      posts,
    });

  } catch (error) {
    console.error("Get all posts error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
        httpOnly: true,
        secure: true,
    });

    res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const checkAuth = (req,res) =>{
  // console.log("Inside checkAuth controller");
  const user = req.user;
  // console.log("Authenticated user:", user);
    try{
        
        if(!user){
            return res.json({
                success:false,
                message:"User not authenticated",
                user
            })
        } 
        return res.json({
          success:true,
          message:"User is authenticated",
          user
        })
    }
    catch(error){
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        });
    }
}

export {register,login,uploadProfileImage,getAllPosts,checkAuth,logout};