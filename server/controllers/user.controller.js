import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import uploadFromBuffer from "../utils/cloudinary.js";
import Post from "../models/post.model.js";
import transporter from "../config/nodemailer.js";

// This is your helper function to generate a token and set the cookie.
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
        user.password = undefined;

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
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Email is not registered" });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(401).json({ success: false, message: "Email or Password is incorrect" });
        }

        if (user.role === 'admin') {
            const otp = String(Math.floor(100000 + Math.random() * 900000));
            const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

            user.verifyOtp = otp;
            user.verifyOtpExpireAt = otpExpiry;
            await user.save();

            await transporter.sendMail({
                from: process.env.SENDER_MAIL,
                to: user.email,
                subject: "Admin Login OTP Verification",
                html: `<p>Your One-Time Password is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
            });

            // CHANGED: Store the userId in a temporary, httpOnly cookie instead of sending it in the response body.
            res.cookie("userId", user._id, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 10 * 60 * 1000, // Expires in 10 minutes
            });

            return res.status(200).json({
                success: true,
                message: "OTP sent to admin email. Please verify.",
                userId: user._id,
                // userId is no longer sent in the body
            });
        } else {
            generateToken(user._id, res);
            user.password = undefined;
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user
            });
        }
    } catch (error) {
        console.log("Error while logging in the user", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifyAdminLogin = async (req, res) => {
    try {
        // CHANGED: Get userId from the temporary cookie, not the request body.
        // console.log("Cookies received:", req.cookies);
        const { otp } = req.body;
        const userId = req.cookies.userId;

        if (!userId || !otp) {
            return res.status(400).json({ success: false, message: "OTP is required and user must be in a verification process." });
        }
        const admin = await User.findById(userId);
        if (!admin || admin.role !== 'admin') {
            return res.status(404).json({ success: false, message: "Admin user not found." });
        }
        if (admin.verifyOtpExpireAt < Date.now()) {
            return res.status(410).json({ success: false, message: "OTP has expired. Please log in again." });
        }
        if (admin.verifyOtp !== otp) {
            return res.status(401).json({ success: false, message: "Invalid OTP." });
        }

        admin.verifyOtp = "";
        admin.verifyOtpExpireAt = 0;
        await admin.save();

        // Generate the final login token and cookie
        generateToken(admin._id, res);

        // CHANGED: Clear the temporary otpUserId cookie now that verification is complete.
        res.clearCookie("userId", {
             httpOnly: true,
             secure: true,
             sameSite: "none",
        });

        admin.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Admin verified and logged in successfully.",
            user: admin,
        });
    } catch (error) {
        console.error("Error in verifyAdminLogin controller:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
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
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
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

const checkAuth = (req, res) => {
    const user = req.user;
    try {
        if (!user) {
            return res.json({
                success: false,
                message: "User not authenticated",
                user: null
            });
        }
        return res.json({
            success: true,
            message: "User is authenticated",
            user
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        });
    }
}

export { register, login, verifyAdminLogin, uploadProfileImage, getAllPosts, checkAuth, logout };