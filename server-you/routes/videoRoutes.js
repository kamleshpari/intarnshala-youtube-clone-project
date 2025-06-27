import express from "express";
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";
import authMiddleware from "../middewares/authMiddleware.js";
import { addComment, deleteComment, editComment, getCommentsByVideo } from "../controllers/commentController.js";


const router = express.Router();

//  Upload a new video
router.post("/", authMiddleware, uploadVideo);

// Get all videos
router.get("/", getAllVideos);

//  Get a single video by ID
router.get("/:id", getVideoById);

// Like a video
router.post("/:id/like", authMiddleware, likeVideo);

// Dislike a video
router.post("/:id/dislike", authMiddleware, dislikeVideo);

router.post("/:id/comments", authMiddleware, addComment);
router.get("/:id/comments", getCommentsByVideo);
router.put("/comments/:commentId", authMiddleware, editComment);
router.delete("/comments/:commentId", authMiddleware, deleteComment);

export default router;
