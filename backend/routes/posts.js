import express, { Router } from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  unlikePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//update
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/unlike", verifyToken, unlikePost);

export default router;
