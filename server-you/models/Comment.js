import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  commentText: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
