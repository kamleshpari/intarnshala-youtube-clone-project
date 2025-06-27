import Comment from "../models/Comment.js";
import mongoose from "mongoose";

// Add a comment to a video
export const addComment = async (req, res) => {
  const { text } = req.body;
  const { id: videoId } = req.params;

  if (!text || !videoId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.user.id,
      video_id: videoId,
      commentText: text,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

//  Edit comment
export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user_id.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    comment.commentText = text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update comment", error: err.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user_id.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment", error: err.message });
  }
};

//  Get comments for a video
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ video_id: req.params.id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};

