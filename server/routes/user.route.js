import { Router } from "express";
import { checkAuth, getAllPosts, login, logout, register, uploadProfileImage,verifyAdminLogin } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { protect } from "../middlewares/user.middlware.js";

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.patch('/update-profile', protect, upload.single('image'), uploadProfileImage);
userRouter.get('/get-all-post',getAllPosts);
userRouter.get('/check-auth',protect,checkAuth);
userRouter.post('/logout',logout);
userRouter.post('/verify-admin-login', verifyAdminLogin);

export default userRouter;