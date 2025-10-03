import { Router } from "express";
import { 
  createPost, 
  updatePost, 
  deletePost, 
  getPostBySlug, 
  getSimilarCategoryPosts 
} from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
import { isAdmin, protect } from "../middlewares/user.middlware.js";

const postRouter = Router();

postRouter.post(
  '/create',
  protect, isAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'contentImages', maxCount: 10 }
  ]),
  createPost
);

postRouter.patch(
  '/update/:id',
  protect, isAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'contentImages', maxCount: 10 }
  ]),
  updatePost
);

postRouter.delete('/delete/:id', protect, isAdmin, deletePost);
postRouter.get('/get-post/:slug', getPostBySlug);
postRouter.get('/get-similar-post/:slug', getSimilarCategoryPosts); // <-- updated

export default postRouter;
