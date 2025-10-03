import { Router } from "express";
import { createPost, updatePost, deletePost, getPostById, getSimilarCategoryPosts } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
import { isAdmin, protect } from "../middlewares/user.middlware.js";

const postRouter = Router();

// Use upload.fields() to handle mainImage and optional contentImages
postRouter.post(
  '/create',
  protect,isAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'contentImages', maxCount: 10 }
  ]),
  createPost
);

postRouter.patch(
  '/update/:id',
  protect,isAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'contentImages', maxCount: 10 }
  ]),
  updatePost
);

postRouter.delete('/delete/:id', protect, isAdmin, deletePost);
postRouter.get('/get-post/:id',getPostById);
postRouter.get('/get-similar-post/:id',getSimilarCategoryPosts);

export default postRouter;
