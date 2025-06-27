import express from "express";
import {
  addComment,
  editComment,
  deleteComment,
  getCommentsByVideo,
} from "../controllers/commentController.js";
import authMiddleware from "../middewares/authMiddleware.js";
//import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Add comment to a video
router.post("/videos/:id/comments", authMiddleware, addComment);

//  Edit a comment
router.put("/:commentId", authMiddleware, editComment);

//  Delete a comment
router.delete("/:commentId", authMiddleware, deleteComment);

//  Get comments for a video
router.get("/videos/:id/comments", getCommentsByVideo);

export default router;
